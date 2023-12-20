// External library imports
import chalk from 'chalk';
import debug from 'debug';

import { kadenaGenMnemonic, kadenaMnemonicToSeed } from '@kadena/hd-wallet';
import {
  kadenaGenMnemonic as LegacyKadenaGenMnemonic,
  kadenaMnemonicToRootKeypair as legacykadenaMnemonicToRootKeypair,
} from '@kadena/hd-wallet/chainweaver';

// Internal module imports
import type { Command } from 'commander';
import { WALLET_DIR } from '../../constants/config.js';
import { createCommand } from '../../utils/createCommand.js';
import { globalOptions } from '../../utils/globalOptions.js';

import { services } from '../../services/index.js';
import type { CommandResult } from '../../utils/command.util.js';
import { assertCommandError } from '../../utils/command.util.js';
import {
  displayGeneratedWallet,
  displayStoredWallet,
} from '../utils/keysDisplay.js';
import * as storageService from '../utils/storage.js';

/**
 * Generates a new key for the wallet.
 * @param {string} password - The password to encrypt the mnemonic with.
 * @param {boolean} legacy - Whether to use legacy format.
 * @returns {Promise<{words: string, seed: string}>} - The mnemonic words and seed.
 */
async function generateKey(
  password: string,
  legacy: boolean,
): Promise<{ words: string; seed: string }> {
  let words: string;
  let seed: string;

  if (legacy === true) {
    words = LegacyKadenaGenMnemonic();
    seed = await legacykadenaMnemonicToRootKeypair(password, words);
  } else {
    words = kadenaGenMnemonic();
    seed = await kadenaMnemonicToSeed(password, words);
  }

  return { words, seed };
}

export const generateWallet = async (
  keyWallet: string,
  password: string,
  legacy: boolean,
): Promise<
  CommandResult<{
    mnemonic: string;
    path: string;
  }>
> => {
  const walletPath = `${WALLET_DIR}/${keyWallet}`;
  if (await services.filesystem.fileExists(walletPath)) {
    return {
      success: false,
      errors: [`Wallet named "${keyWallet}" already exists.`],
    };
  }

  const { words, seed } = await generateKey(password, legacy);

  const path = await storageService.storeWallet(seed, keyWallet, legacy);

  return {
    success: true,
    data: { mnemonic: words, path },
  };
};

/**
 * Creates a command to generate wallets.
 * @param {Command} program - The commander program.
 * @param {string} version - The version of the program.
 */
export const createGenerateWalletCommand: (
  program: Command,
  version: string,
) => void = createCommand(
  'create-wallet',
  'create your local wallet',
  [
    globalOptions.keyWallet({ isOptional: false }),
    globalOptions.securityPassword({ isOptional: false }),
    globalOptions.securityVerifyPassword({ isOptional: false }),
    globalOptions.legacy({ isOptional: true, disableQuestion: true }),
  ],
  async (config) => {
    try {
      debug('create-wallet:action')({ config });

      // compare passwords
      if (config.securityPassword !== config.securityVerifyPassword) {
        console.log(chalk.red(`\nPasswords don't match. Please try again.\n`));
        return process.exit(1);
      }

      const result = await generateWallet(
        config.keyWallet,
        config.securityPassword,
        config.legacy,
      );

      assertCommandError(result);

      displayGeneratedWallet(result.data.mnemonic);
      displayStoredWallet(config.keyWallet, config.legacy);
    } catch (error) {
      console.error(chalk.red(`\n${error.message}\n`));
      process.exit(1);
    }
  },
);
