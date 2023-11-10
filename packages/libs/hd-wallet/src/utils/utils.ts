import {
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
  randomBytes,
} from 'crypto';

type BinaryLike = string | NodeJS.ArrayBufferView;

/**
 * Derive a cryptographic key from the provided password.
 * @param {string} password - User's password.
 * @returns {Buffer} - Returns the derived cryptographic key.
 */
function deriveKey(password: string, salt: BinaryLike): Buffer {
  return pbkdf2Sync(password, salt, 1000, 32, 'sha256');
}

/**
 * Encrypt the provided text using AES-256-GCM algorithm.
 * @param {Buffer} text - Text to encrypt.
 * @param {string} password - User's password.
 * @returns {{ cipherText: Buffer; iv: Buffer; tag: Buffer }} - Returns the encrypted text, initialization vector, and authentication tag.
 */
export function encrypt(
  text: Buffer,
  password: string,
  salt: BinaryLike,
): { cipherText: Buffer; iv: Buffer; tag: Buffer } {
  const key = deriveKey(password, salt);
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const cipherText = Buffer.concat([cipher.update(text), cipher.final()]);
  const tag = cipher.getAuthTag(); // Capture the authentication tag
  return {
    cipherText,
    iv,
    tag,
  };
}

/**
 * Decrypt the provided encrypted text using AES-256-GCM algorithm.
 * @param encrypted - Encrypted text, initialization vector, and authentication tag.
 * @param password - User's password.
 * @returns  Returns the decrypted text or undefined if decryption fails.
 * @internal
 */
export function decrypt(
  encrypted: {
    cipherText: Buffer;
    iv: Buffer;
    tag: Buffer;
  },
  password: string,
  salt: BinaryLike,
): Buffer | undefined {
  const key = deriveKey(password, salt);
  const decipher = createDecipheriv('aes-256-gcm', key, encrypted.iv);
  decipher.setAuthTag(encrypted.tag); // Set the authentication tag
  try {
    return Buffer.concat([
      decipher.update(encrypted.cipherText),
      decipher.final(),
    ]);
  } catch (err) {
    console.warn('Failed to decrypt');
    return undefined;
  }
}

/**
 * Convert a Buffer to a Base64 encoded string.
 * @param {Buffer} buffer - Buffer to convert.
 * @returns {string} - Returns the Base64 encoded string.
 */
export function bufferToBase64(buffer: Buffer): string {
  return buffer.toString('base64');
}

/**
 * Convert a Base64 encoded string to a Buffer.
 * @param {string} base64 - Base64 encoded string to convert.
 * @returns {Buffer} - Returns the resulting Buffer.
 */
export function base64ToBuffer(base64: string): Buffer {
  return Buffer.from(base64, 'base64');
}

export const HARDENED_OFFSET = 0x80000000;
export const harden = (n: number) => HARDENED_OFFSET + n;

/**
 * Convert a Uint8Array to a hexadecimal string.
 * @param {Uint8Array} uint8Array - The array to convert.
 * @returns {string} - Returns the hexadecimal representation of the input.
 */
export const uint8ArrayToHex = (uint8Array: Uint8Array): string => {
  if (uint8Array.length === 33 && uint8Array.at(0) === 0) {
    uint8Array = uint8Array.slice(1);
  }
  return [...uint8Array].map((x) => x.toString(16).padStart(2, '0')).join('');
};
