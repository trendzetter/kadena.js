import type {
  ChainwebChainId,
  ICommandResult,
} from '@kadena/chainweb-node-client';
import type { ICommand } from '@kadena/client';
import { Pact, createClient, createSignWithKeypair } from '@kadena/client';
import { retrieveContractFromChain } from '@kadena/pactjs-cli/src/utils/retrieveContractFromChain';

import { sender00Account } from '@constants/accounts.constants';
import {
  devnetUrl,
  mainNetHost,
  networkId,
} from '@constants/network.constants';
import fs from 'fs';
import path from 'path';

export const deployGaurdsContract = async ({
  chainId,
  upgrade,
  namespace = 'util',
}: {
  chainId: ChainwebChainId;
  upgrade: boolean;
  namespace: string;
}): Promise<Record<string, ICommandResult>> => {
  const rawContract = await retrieveContractFromChain(
    'guards',
    mainNetHost,
    '1',
    'mainnet',
  );

  const contract = "(namespace 'util)".concat(rawContract);
  const transaction = Pact.builder
    .execution(contract)
    .addKeyset('util-ns-admin', 'keys-any', sender00Account.keys[0].publicKey)
    .addSigner(sender00Account.keys[0].publicKey)
    .setMeta({
      chainId,
      gasPrice: 0.000001,
      gasLimit: 70000,
      ttl: 28800,
      senderAccount: sender00Account.account,
    })
    .setNetworkId(networkId)
    .createTransaction();

  const signWithKeypair = createSignWithKeypair([sender00Account.keys[0]]);
  const signedTx = await signWithKeypair(transaction);

  const { submit, pollStatus } = createClient(devnetUrl(chainId));
  const requestKeys = await submit(signedTx as ICommand);
  const status = await pollStatus(requestKeys);
  console.log(status);
  return status;
};

export const deployGuards1Contract = async ({
  chainId,
  upgrade,
  namespace = 'util',
}: {
  chainId: ChainwebChainId;
  upgrade: boolean;
  namespace: string;
}): Promise<Record<string, ICommandResult>> => {
  // const rawContract = await retrieveContractFromChain(
  //   'guards1',
  //   mainNetHost,
  //   '1',
  //   'mainnet',
  // );

  // const contract = "(namespace 'util) \n".concat(rawContract);
  const contract = fs.readFileSync(
    path.resolve(__dirname, './guards1.pact'),
    'utf-8',
  );

  const transaction = Pact.builder
    .execution(contract)
    .addKeyset('util-ns-admin', 'keys-any', sender00Account.keys[0].publicKey)
    .addSigner(sender00Account.keys[0].publicKey)
    .setMeta({
      chainId,
      gasPrice: 0.000001,
      gasLimit: 70000,
      ttl: 28800,
      senderAccount: sender00Account.account,
    })
    .setNetworkId(networkId)
    .createTransaction();

  const signWithKeypair = createSignWithKeypair([sender00Account.keys[0]]);
  const signedTx = await signWithKeypair(transaction);

  const { submit, pollStatus } = createClient(devnetUrl(chainId));
  const requestKeys = await submit(signedTx as ICommand);
  const status = await pollStatus(requestKeys);
  console.log(status);
  return status;
};
