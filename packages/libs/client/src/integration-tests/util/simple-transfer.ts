import { ChainId, IPactDecimal } from '@kadena/types';

import { isSignedTransaction, Pact, readKeyset } from '../../index';

import { listen, preflight, submit } from './client';
import { signByKeyPair } from './sign';

const NETWORK_ID: string = 'fast-development';

export async function fund(
  receiver: string,
  receiverKey: string,
  amount: IPactDecimal,
  chain: ChainId,
): Promise<string | undefined> {
  const senderAccount = 'sender00';
  const signerKey =
    '368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca';

  const transaction = Pact.builder
    .execution(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Pact.modules as any).coin['transfer-create'](
        senderAccount,
        receiver,
        readKeyset('ks'),
        amount,
      ),
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .addSigner(signerKey, (withCapability: any) => [
      withCapability('coin.GAS'),
      withCapability('coin.TRANSFER', senderAccount, receiver, amount),
    ])
    .addKeyset('ks', 'keys-all', receiverKey)
    .setMeta({
      chainId: chain,
      gasLimit: 1000,
      gasPrice: 1.0e-6,
      senderAccount: senderAccount,
    })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const signedTx = signByKeyPair(transaction);

  const preflightResult = await preflight(signedTx);
  if (preflightResult.result.status === 'failure') {
    return 'Preflight Failed';
  }

  if (isSignedTransaction(signedTx)) {
    const requestKey = await submit(signedTx);
    const response = await listen(requestKey);

    if (response.result.status === 'failure') {
      return 'Transaction failed';
    }
    return response.result.status;
  }
}
