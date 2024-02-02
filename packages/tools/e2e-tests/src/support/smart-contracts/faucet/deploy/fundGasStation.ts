import {
  faucetGasStation,
  sender00Account,
} from '@constants/accounts.constants';
import { InitialFunding } from '@constants/amounts.constants';
import { transferFunds } from '@helpers/client-utils/transfer.helper';
import type {
  ChainwebChainId,
  ICommandResult,
} from '@kadena/chainweb-node-client';

export const fundGasStation = async ({
  chainId,
  upgrade,
}: {
  chainId: ChainwebChainId;
  upgrade: boolean;
}): Promise<ICommandResult> => {
  const transfer = await transferFunds(
    sender00Account,
    faucetGasStation,
    InitialFunding,
    '0',
  );
  return transfer;
};
