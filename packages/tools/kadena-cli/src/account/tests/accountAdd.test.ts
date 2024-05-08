import jsYaml from 'js-yaml';
import { HttpResponse, http } from 'msw';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ACCOUNT_DIR } from '../../constants/config.js';
import { createPrincipalSuccessData } from '../../mocks/data/accountDetails.js';
import { server } from '../../mocks/server.js';
import { services } from '../../services/index.js';
import { mockPrompts, runCommand } from '../../utils/test.util.js';

describe('account add manual type', () => {
  const root = path.join(__dirname, '../../../');
  const configPath = path.join(root, '.kadena');
  const accountPath = path.join(configPath, ACCOUNT_DIR);
  const accountAliasFile = path.join(
    accountPath,
    'account-add-test-manual.yaml',
  );
  beforeEach(async () => {
    if (await services.filesystem.fileExists(accountAliasFile)) {
      await services.filesystem.deleteFile(accountAliasFile);
    }
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it('should add an account alias using manual type without on chain verification', async () => {
    mockPrompts({
      select: {
        'How would you like to add the account locally?': 'manual',
        'Select a keyset predicate:': 'keys-all',
        'Do you want to verify the account on chain?': false,
      },
      input: {
        'Enter an alias for an account:': 'account-add-test-manual',
        'Enter an account name (optional):': 'k:pubkey1',
        'Enter the name of a fungible:': 'coin',
        'Enter one or more public keys (comma separated):': 'pubkey1,pubkey2',
      },
    });

    await runCommand('account add');
    expect(await services.filesystem.fileExists(accountAliasFile)).toBe(true);
  });

  it('should add an account alias using manual type with on chain verification', async () => {
    mockPrompts({
      select: {
        'How would you like to add the account locally?': 'manual',
        'Do you want to verify the account on chain?': true,
        'Select a network:': 'testnet',
      },
      input: {
        'Enter an alias for an account:': 'account-add-test-manual-chain',
        'Enter an account name (optional):': 'k:pubkey1',
        'Enter the name of a fungible:': 'coin',
        'Enter ChainId (0-19):': '1',
      },
    });

    await runCommand('account add');
    const aliasFile = path.join(
      accountPath,
      'account-add-test-manual-chain.yaml',
    );
    expect(await services.filesystem.fileExists(aliasFile)).toBe(true);
    const content = await services.filesystem.readFile(aliasFile);
    expect(jsYaml.load(content!)).toEqual({
      name: 'k:pubkey1',
      fungible: 'coin',
      publicKeys: ['publicKey1', 'publicKey2'],
      predicate: 'keys-all',
    });
  });

  it('should add an account alias from create principal when account name is empty', async () => {
    server.use(
      http.post(
        'https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/0/pact/api/v1/local',
        async (): Promise<HttpResponse> => {
          return HttpResponse.json(createPrincipalSuccessData, { status: 200 });
        },
      ),
    );
    mockPrompts({
      select: {
        'How would you like to add the account locally?': 'manual',
        'Select a keyset predicate:': 'keys-all',
        'Do you want to verify the account on chain?': false,
      },
      input: {
        'Enter an alias for an account:': 'account-add-test-manual',
        'Enter an account name (optional):': '',
        'Enter the name of a fungible:': 'coin',
        'Enter one or more public keys (comma separated):': 'pubkey1,pubkey2',
      },
    });

    await runCommand('account add');
    expect(await services.filesystem.fileExists(accountAliasFile)).toBe(true);
    const content = await services.filesystem.readFile(accountAliasFile);
    expect(jsYaml.load(content!)).toEqual({
      name: 'w:FxlQEvb6qHb50NClEnpwbT2uoJHuAu39GTSwXmASH2k:keys-all',
      fungible: 'coin',
      publicKeys: ['pubkey1', 'pubkey2'],
      predicate: 'keys-all',
    });
  });

  it('should add an account alias manual with quiet flag', async () => {
    await runCommand(
      'account add --type=manual --account-alias=account-add-test-manual --account-name=k:pubkey1 --fungible=coin --verify --network=testnet --chain-id=1',
    );
    expect(await services.filesystem.fileExists(accountAliasFile)).toBe(true);
    const content = await services.filesystem.readFile(accountAliasFile);
    expect(jsYaml.load(content!)).toEqual({
      name: 'k:pubkey1',
      fungible: 'coin',
      publicKeys: ['publicKey1', 'publicKey2'],
      predicate: 'keys-all',
    });
  });
});

describe('account add type wallet', () => {
  const root = path.join(__dirname, '../../../');
  const configPath = path.join(root, '.kadena');
  const accountPath = path.join(configPath, ACCOUNT_DIR);
  const accountAliasFile = path.join(
    accountPath,
    'account-add-test-manual.yaml',
  );
  let publicKey: string;
  beforeEach(async () => {
    const created = await services.wallet.create({
      alias: 'test-wallet',
      legacy: false,
      password: 'test-wallet',
    });
    let wallet = created.wallet;
    const key = await services.wallet.generateKey({
      seed: wallet.seed,
      legacy: wallet.legacy,
      password: 'test-wallet',
      index: 0,
    });
    wallet = await services.wallet.storeKey(wallet, key);
    publicKey = wallet.keys[0].publicKey;
    if (await services.filesystem.fileExists(accountAliasFile)) {
      await services.filesystem.deleteFile(accountAliasFile);
    }
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it('should add an account alias using manual type without on chain verification', async () => {
    server.use(
      http.post(
        'https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/0/pact/api/v1/local',
        async (): Promise<HttpResponse> => {
          return HttpResponse.json(createPrincipalSuccessData, { status: 200 });
        },
      ),
    );
    mockPrompts({
      select: {
        'How would you like to add the account locally?': 'wallet',
        'Select a wallet:': 'test-wallet',
        'Select a keyset predicate:': 'keys-all',
      },
      input: {
        'Enter an alias for an account:': 'account-add-test-manual',
        'Enter the name of a fungible:': 'coin',
      },
      checkbox: {
        'Select public keys to add to account(index - alias - publickey):': [0],
      },
      verbose: true,
    });

    await runCommand('account add');
    expect(await services.filesystem.fileExists(accountAliasFile)).toBe(true);
    const content = await services.filesystem.readFile(accountAliasFile);
    expect(jsYaml.load(content!)).toEqual({
      name: 'w:FxlQEvb6qHb50NClEnpwbT2uoJHuAu39GTSwXmASH2k:keys-all',
      fungible: 'coin',
      publicKeys: [publicKey],
      predicate: 'keys-all',
    });
  });
});
