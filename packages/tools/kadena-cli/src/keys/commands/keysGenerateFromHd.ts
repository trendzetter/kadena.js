import type { Command } from 'commander';
import debug from 'debug';
import { createCommand } from '../../utils/createCommand.js';
import { globalOptions } from '../../utils/globalOptions.js';
import type { IKeysConfig } from '../utils/keySharedGeneratorUtils.js';
import { generateFromHd } from '../utils/keySharedGeneratorUtils.js';
import {
  displayGeneratedPlainKeys,
  printStoredPlainKeys,
} from '../utils/keysDisplay.js';

import * as storageService from '../utils/storage.js';

import ora from 'ora';

export const createGenerateFromHdCommand: (
  program: Command,
  version: string,
) => void = createCommand(
  'from-hd',
  'Generate key(s) from HD key (encrypted seed)',
  [
    globalOptions.keyGenFromChoice(),
    globalOptions.keyAlias(),
    globalOptions.keySeed(),
    globalOptions.keyPassword(),
    globalOptions.keyAmount({ isOptional: true }),
  ],
  async (config) => {
    debug('generate-from-hd:action')({ config });

    const loading = ora('Generating from seed..').start();
    try {
      const keys = await generateFromHd(config as IKeysConfig);
      loading.succeed('Completed');
      displayGeneratedPlainKeys(keys);

      const isLegacy = config.keySeed.length >= 256;

      await storageService.savePlainKeyByAlias(config.keyAlias, keys, isLegacy);
      printStoredPlainKeys(config.keyAlias, keys, isLegacy);
    } catch (error) {
      loading.fail('Operation failed');
      console.error(`Error: ${error instanceof Error ? error.message : error}`);
    }
  },
);
