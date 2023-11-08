import { describe, expect, it } from 'vitest';
import {
  kadenaChangePassword,
  kadenaDecryptPrivateKey,
  kadenaGenKeypair,
  kadenaGenMnemonic,
  kadenaGenSeedFromMnemonic,
  kadenaGetPublic,
  kadenaRestoreSeedBufferFromSeed,
  kadenaSignWithKeyPair,
  kadenaSignWithSeed,
} from '..';

import type { IUnsignedCommand } from '@kadena/client';

import { decryptPrivateKey, encryptPrivateKey } from '../utils/encrypt';
import { deriveKeyPair, uint8ArrayToHex } from '../utils/sign';

const toHexStr = (bytes: Uint8Array) => Buffer.from(bytes).toString('hex');

describe('kadenaGenMnemonic', () => {
  it('should generate a valid mnemonic', () => {
    const mnemonic = kadenaGenMnemonic();
    expect(mnemonic.split(' ')).toHaveLength(12);
  });
});

describe('kadenaGenSeedFromMnemonic', () => {
  it('should convert mnemonic to seed buffer and encrypt seed with a password', async () => {
    const mnemonic = kadenaGenMnemonic();
    const password = 'password';
    const { seedBuffer, seed } = await kadenaGenSeedFromMnemonic(
      mnemonic,
      password,
    );
    expect(seedBuffer).toBeInstanceOf(Uint8Array);

    expect(typeof seed).toBe('string'); // Check if the seed is a string, indicating it has been encrypted
    expect(seed).not.toBe(toHexStr(seedBuffer)); // Additional checks to ensure seed is not the same as seedBuffer
  });

  it('should convert mnemonic to seed buffer and encode seed without a password', async () => {
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer, seed } = await kadenaGenSeedFromMnemonic(mnemonic);
    expect(seedBuffer).toBeInstanceOf(Uint8Array);

    expect(typeof seed).toBe('string'); // Check if the seed is a string, indicating it has been encoded
    expect(seed).toBe(Buffer.from(seedBuffer).toString('base64')); // Check that the encoded seed is the base64 version of the seedBuffer
  });

  it('should throw an error for an invalid mnemonic', async () => {
    const invalidMnemonic = 'this is not a valid mnemonic';

    await expect(
      kadenaGenSeedFromMnemonic(invalidMnemonic),
    ).rejects.toThrowError('Invalid mnemonic.');
  });

  it('should throw an error when mnemonic is empty', async () => {
    const emptyMnemonic = '';

    await expect(kadenaGenSeedFromMnemonic(emptyMnemonic)).rejects.toThrowError(
      'Invalid mnemonic.',
    );
  });
});

describe('kadenaGenKeypair', () => {
  it('should generate an encrypted keypair from the seedBuffer when a password is provided', async () => {
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);
    const password = 'correcthorsebatterystaple';
    const [publicKey, encryptedPrivateKey] = kadenaGenKeypair(
      seedBuffer,
      0,
      password,
    );

    expect(publicKey).toHaveLength(64);
    expect(typeof encryptedPrivateKey).toBe('string'); // Checks if privateKey is a string, thus encrypted
  });

  it('should generate a non-encrypted keypair from the seedBuffer when no password is provided', async () => {
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);
    const [publicKey, privateKey] = kadenaGenKeypair(seedBuffer, 0);

    expect(publicKey).toHaveLength(64);
    expect(typeof privateKey).toBe('string'); // The privateKey should be a hex string if not encrypted
    expect(privateKey).toMatch(/^[a-fA-F0-9]+$/); // Reg-ex for hex string
  });

  it('should generate a keypair from the seedBuffer', async () => {
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);
    const [publicKey, privateKey] = kadenaGenKeypair(seedBuffer, 0);
    expect(publicKey).toHaveLength(64);
    expect(privateKey).toHaveLength(64);
  });

  it('should generate a range of keypairs from the seedBuffer', async () => {
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);
    const keyPairs = kadenaGenKeypair(seedBuffer, [0, 3]);
    expect(keyPairs).toHaveLength(4);
    keyPairs.forEach(([publicKey, privateKey]) => {
      expect(publicKey).toHaveLength(64);
      expect(privateKey).toHaveLength(64);
    });
  });

  it('should throw an error for out-of-bounds index values', async () => {
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);
    const outOfBoundsIndex = -1;

    expect(() => {
      kadenaGenKeypair(seedBuffer, outOfBoundsIndex);
    }).toThrowError('Invalid child index: -1');
  });

  it('should throw an error for out-of-bounds index values when a password is provided', async () => {
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);
    const outOfBoundsIndex = -1;
    const password = 'peanutbutterjellytime';

    expect(() => {
      kadenaGenKeypair(seedBuffer, outOfBoundsIndex, password);
    }).toThrowError('Invalid child index: -1');
  });

  it('should throw an error when the seed buffer is empty', async () => {
    const emptySeedBuffer = new Uint8Array([]);

    expect(() => {
      kadenaGenKeypair(emptySeedBuffer, 0);
    }).toThrowError(
      'HDKey: wrong seed length=0. Should be between 128 and 512 bits; 256 bits is advised)',
    );
  });

  it('should handle the highest non-hardened index without throwing errors', async () => {
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);

    /*
     * HD wallets as per BIP32 spec define two types of indices:
     * - Non-hardened (ranging from 0 to 2^31 - 1)
     * - Hardened (ranging from 2^31 to 2^32 - 1).
     * The highest non-hardened index is therefore 2^31 - 1,
     * which is the largest 32-bit integer that can be used for generating non-hardened keys.
     */

    const highestNonHardenedIndex = 2 ** 31 - 1;
    expect(() => {
      kadenaGenKeypair(seedBuffer, highestNonHardenedIndex);
    }).not.toThrow();
  });
});

describe('kadenaGetPublic', () => {
  it('should retrieve the public key from seedBuffer and default to index 0 when no index is given', async () => {
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);

    const publicKeyDefault = kadenaGetPublic(seedBuffer);
    const publicKeyIndex0 = kadenaGetPublic(seedBuffer, 0);

    expect(publicKeyDefault).toHaveLength(64);
    expect(publicKeyIndex0).toHaveLength(64);

    // Check that the public key obtained without specifying an index
    // is the same as the one obtained when index 0 is explicitly provided
    expect(publicKeyDefault).toBe(publicKeyIndex0);
  });

  it('should retrieve the public key from seedBuffer and index', async () => {
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);
    const publicKey = kadenaGetPublic(seedBuffer, 0);
    expect(publicKey).toHaveLength(64);
  });

  it('should retrieve distinct public keys from seedBuffer for different indexes', async () => {
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);

    const indexes = [0, 1, 2, 3, 4];
    const publicKeys = indexes.map((index) =>
      kadenaGetPublic(seedBuffer, index),
    );

    publicKeys.forEach((publicKey) => {
      expect(publicKey).toHaveLength(64);
    });

    const uniquePublicKeys = new Set(publicKeys); // Check that all public keys are unique
    expect(uniquePublicKeys.size).toBe(indexes.length);
  });
});

describe('kadenaRestoreSeedBufferFromSeed', () => {
  it('should restore the seed buffer from an encrypted/encoded seed', async () => {
    const mnemonic = kadenaGenMnemonic();
    const password = 'password';
    const { seed } = await kadenaGenSeedFromMnemonic(mnemonic, password);
    const seedBuffer = kadenaRestoreSeedBufferFromSeed(seed, password);
    expect(seedBuffer).toBeInstanceOf(Uint8Array);
  });

  it('should restore the seed buffer from an encrypted seed using a password', async () => {
    const mnemonic = kadenaGenMnemonic();
    const password = 'password';

    const { seedBuffer: originalSeedBuffer, seed: encryptedSeed } =
      await kadenaGenSeedFromMnemonic(mnemonic, password);

    const restoredSeedBuffer = kadenaRestoreSeedBufferFromSeed(
      encryptedSeed,
      password,
    );
    expect(restoredSeedBuffer).toBeInstanceOf(Uint8Array);

    expect(Buffer.from(restoredSeedBuffer).toString('hex')).toBe(
      Buffer.from(originalSeedBuffer).toString('hex'),
    ); // Check if the restored seed buffer matches the original seed buffer
  });

  it('should restore the seed buffer from an encoded seed without a password', async () => {
    const mnemonic = kadenaGenMnemonic();

    const { seedBuffer: originalSeedBuffer, seed: encodedSeed } =
      await kadenaGenSeedFromMnemonic(mnemonic);

    const restoredSeedBuffer = kadenaRestoreSeedBufferFromSeed(encodedSeed);
    expect(restoredSeedBuffer).toBeInstanceOf(Uint8Array);

    expect(Buffer.from(restoredSeedBuffer).toString('hex')).toBe(
      Buffer.from(originalSeedBuffer).toString('hex'),
    ); // Check if the restored seed buffer matches the original seed buffer
  });

  it('should fail to restore the seed buffer with an incorrect password', async () => {
    const mnemonic = kadenaGenMnemonic();
    const correctPassword = 'password';
    const wrongPassword = 'wrongPassword';
    const { seed } = await kadenaGenSeedFromMnemonic(mnemonic, correctPassword);

    expect(() => {
      kadenaRestoreSeedBufferFromSeed(seed, wrongPassword);
    }).toThrowError('Failed to decrypt seed.');
  });

  it('should throw an error when no seed is provided', () => {
    expect(() => {
      kadenaRestoreSeedBufferFromSeed('');
    }).toThrowError('No seed provided.');
  });
});

describe('kadenaDecryptPrivateKey', () => {
  it('should correctly decrypt a previously encrypted private key', async () => {
    const password = 'test-password';
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);

    const [, encryptedPrivateKey] = kadenaGenKeypair(
      seedBuffer,
      0,
      password,
    ) as [string, string];

    const decryptedKey = kadenaDecryptPrivateKey(encryptedPrivateKey, password);

    const originalPrivateKey = Buffer.from(
      deriveKeyPair(seedBuffer, 0).privateKey,
      'hex',
    );

    expect(decryptedKey).toEqual(new Uint8Array(originalPrivateKey));
  });

  it('should throw an error when the incorrect password is provided', async () => {
    const correctPassword = 'correct-password';
    const wrongPassword = 'wrong-password';
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);

    // Generate and encrypt the key pair
    const [, encryptedPrivateKey] = kadenaGenKeypair(
      seedBuffer,
      0,
      correctPassword,
    ) as [string, string];

    // Attempt to decrypt with the wrong password should fail
    expect(() => {
      kadenaDecryptPrivateKey(encryptedPrivateKey, wrongPassword);
    }).toThrow('Decryption failed');
  });

  it('should throw an error if the encrypted key is corrupted', () => {
    const password = 'test-password';
    const corruptedEncryptedPrivateKey = 'corrupted-data';

    expect(() => {
      kadenaDecryptPrivateKey(corruptedEncryptedPrivateKey, password);
    }).toThrow('Decryption failed');
  });

  it('should throw an error if the encrypted private key or password is empty', () => {
    const password = 'test-password';
    const emptyEncryptedPrivateKey = '';

    expect(() => {
      kadenaDecryptPrivateKey(emptyEncryptedPrivateKey, password);
    }).toThrow('Decryption failed');

    expect(() => {
      kadenaDecryptPrivateKey(emptyEncryptedPrivateKey, '');
    }).toThrow('Decryption failed');
  });

  it('should handle passwords with special characters', async () => {
    const specialCharPassword = 'p@ssw0rd!#%&';
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);
    const [, encryptedPrivateKey] = kadenaGenKeypair(
      seedBuffer,
      0,
      specialCharPassword,
    ) as [string, string];

    const decryptedKey = kadenaDecryptPrivateKey(
      encryptedPrivateKey,
      specialCharPassword,
    );
    expect(decryptedKey).toBeInstanceOf(Uint8Array);
  });

  it('should handle extremely long passwords', async () => {
    const longPassword = 'p'.repeat(1000);
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);

    const keyPair = kadenaGenKeypair(seedBuffer, 0, longPassword) as [
      string,
      string,
    ]; // When using an index, kadenaGenKeypair returns a single key pair, not an array

    const [, encryptedPrivateKey] = keyPair;

    const decryptedKey = kadenaDecryptPrivateKey(
      encryptedPrivateKey,
      longPassword,
    );
    expect(decryptedKey).toBeInstanceOf(Uint8Array);
  });

  it('should handle unicode characters in passwords', async () => {
    const unicodePassword = '密码'; // 'password' in Chinese
    const mnemonic = kadenaGenMnemonic();
    const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);
    const [, encryptedPrivateKey] = kadenaGenKeypair(
      seedBuffer,
      0,
      unicodePassword,
    ) as [string, string];

    const decryptedKey = kadenaDecryptPrivateKey(
      encryptedPrivateKey,
      unicodePassword,
    );
    expect(decryptedKey).toBeInstanceOf(Uint8Array);
  });
});

describe('kadenaChangePassword', () => {
  const privateKey = Uint8Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 256),
  );
  const oldPassword = 'oldPassword123';
  const newPassword = 'newPassword123';

  // Helper function to simulate encrypting a private key
  const encryptAndChangePassword = (
    privateKey: Uint8Array,
    oldPassword: string,
    newPassword: string,
  ) => {
    const encryptedPrivateKey = encryptPrivateKey(privateKey, oldPassword);
    return kadenaChangePassword(encryptedPrivateKey, oldPassword, newPassword);
  };

  it('changes the password successfully and allows decryption with the new password', () => {
    const newEncryptedPrivateKey = encryptAndChangePassword(
      privateKey,
      oldPassword,
      newPassword,
    );
    const decryptedWithNewPassword = kadenaDecryptPrivateKey(
      newEncryptedPrivateKey,
      newPassword,
    );
    expect(decryptedWithNewPassword).toEqual(privateKey);
  });

  it('throws an error when the old password is incorrect', () => {
    const encryptedPrivateKey = encryptPrivateKey(privateKey, oldPassword);
    const incorrectOldPassword = 'wrongPassword';
    const changePasswordAttempt = () =>
      kadenaChangePassword(
        encryptedPrivateKey,
        incorrectOldPassword,
        newPassword,
      );

    expect(changePasswordAttempt).toThrow(
      'Failed to decrypt the private key with the old password: Decryption failed',
    );
  });

  it('fails to decrypt with the old password after the password has been changed', () => {
    const newEncryptedPrivateKey = encryptAndChangePassword(
      privateKey,
      oldPassword,
      newPassword,
    );
    const decryptWithOldPasswordAttempt = () =>
      decryptPrivateKey(newEncryptedPrivateKey, oldPassword);
    expect(decryptWithOldPasswordAttempt).toThrow();
  });

  it('fails when the new password is an empty string', () => {
    const encryptedPrivateKey = encryptPrivateKey(privateKey, oldPassword);
    const newPassword = '';
    const changePasswordAttempt = () =>
      kadenaChangePassword(encryptedPrivateKey, oldPassword, newPassword);

    expect(changePasswordAttempt).toThrow();
  });

  it('throws an error when the encrypted private key is in an incorrect format', () => {
    const incorrectFormatPrivateKey = 'not a valid encrypted key';
    const changePasswordAttempt = () =>
      kadenaChangePassword(incorrectFormatPrivateKey, oldPassword, newPassword);

    expect(changePasswordAttempt).toThrow();
  });

  describe('kadenaChangePassword with kadenaGenKeypair', () => {
    const seedBuffer = Uint8Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 256),
    ); // Simulated seed buffer
    const index = 0; // The index to generate the key pair
    const oldPassword = 'oldPassword123';
    const newPassword = 'newPassword123';

    it('generates a key pair, changes the password, and allows decryption with the new password', () => {
      const [, encryptedPrivateKey] = kadenaGenKeypair(
        seedBuffer,
        index,
        oldPassword,
      ) as string[]; // Generate the key pair with the old password

      const newEncryptedPrivateKey = kadenaChangePassword(
        encryptedPrivateKey,
        oldPassword,
        newPassword,
      ); // Change the password of the encrypted private key

      const decryptedWithNewPassword = decryptPrivateKey(
        newEncryptedPrivateKey,
        newPassword,
      ); // Decrypt the new encrypted private key with the new password

      const decryptedPrivateKeyHex = uint8ArrayToHex(
        new Uint8Array(decryptedWithNewPassword),
      ); // Convert the decrypted Uint8Array back to a hex string to compare with the original

      const { privateKey: originalPrivateKeyHex } = deriveKeyPair(
        seedBuffer,
        index,
      );

      expect(decryptedPrivateKeyHex).toEqual(originalPrivateKeyHex); // Compare the decrypted private key with the original
    });
  });

  const testUndefined = undefined as unknown as string;
  const testNull = null as unknown as string;
  const testUnint8Array = Uint8Array.from({ length: 32 }) as unknown as string;

  it('handles non-string inputs for private keys and passwords', () => {
    expect(() =>
      kadenaChangePassword(testUndefined, oldPassword, newPassword),
    ).toThrow();
    expect(() =>
      kadenaChangePassword(testUnint8Array, testUndefined, newPassword),
    ).toThrow();
    expect(() =>
      kadenaChangePassword(testUnint8Array, oldPassword, testUndefined),
    ).toThrow();
    expect(() =>
      kadenaChangePassword(testNull, oldPassword, newPassword),
    ).toThrow();
    expect(() =>
      kadenaChangePassword(testUnint8Array, testNull, newPassword),
    ).toThrow();
    expect(() =>
      kadenaChangePassword(testUnint8Array, oldPassword, testNull),
    ).toThrow();
  });
});

describe.only('kadenaSignWithKeyPair', async () => {
  const mnemonic = kadenaGenMnemonic();
  const { seedBuffer } = await kadenaGenSeedFromMnemonic(mnemonic);

  const [publicKey, privateKey] = kadenaGenKeypair(seedBuffer, 0) as [
    string,
    string,
  ];

  const mockUnsignedCommand: IUnsignedCommand = {
    cmd: '{"command":"value"}',
    hash: 'kadena-hash',
    sigs: [],
  };
  it('should sign a transaction with a public and private key pair', () => {
    const signer = kadenaSignWithKeyPair(publicKey, privateKey);

    const signedTx = signer(mockUnsignedCommand);

    expect(signedTx).toHaveProperty('sigs');
    expect(signedTx.sigs).toBeInstanceOf(Array);
    expect(signedTx.sigs.length).toBeGreaterThan(0);
    expect(signedTx.sigs[0]).toHaveProperty('sig');
    expect(signedTx.sigs[0].sig).toBeTruthy();
  });
});

describe('kadenaSignWithSeed', () => {
  const mockSeed = new Uint8Array(32);
  const mockIndex = 0;
  const mockUnsignedCommand: IUnsignedCommand = {
    cmd: '{"commands":"value"}',
    hash: 'kadena-hash',
    sigs: [],
  };

  it('should sign a transaction with a seed and index', () => {
    const signer = kadenaSignWithSeed(mockSeed, mockIndex);
    const signedTx = signer(mockUnsignedCommand);
    expect(signedTx).toHaveProperty('sigs');
    expect(signedTx.sigs).toBeInstanceOf(Array);
    expect(signedTx.sigs[0]).toHaveProperty('sig');

    expect(signedTx.sigs[0].sig).toBeTruthy();
  });
});
