import type { Transaction, Transfer } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Guard {
  keys: string[];
  predicate: 'keys-all' | 'keys-any' | 'keys-two';
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface GasLimitEstimation {
  amount: number;
  inputType: string;
  usedPreflight: boolean;
  usedSignatureVerification: boolean;
  transaction: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Token {
  id: string;
  balance: number;
  chainId: string;
  info?: TokenInfo;
  version: string;
}

export interface TokenInfo {
  supply: number;
  precision: number;
  uri: string;
  // TODO: figure out what to do with weird pact-arrays
  // policies: string[];
}

export const FungibleChainAccountName: 'FungibleChainAccount' =
  'FungibleChainAccount';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface FungibleChainAccount {
  __typename: typeof FungibleChainAccountName;
  chainId: string;
  fungibleName: string;
  accountName: string;
  guard: Guard;
  balance: number;
  transactions: Transaction[];
  transfers: Transfer[];
}

export const FungibleAccountName: 'FungibleAccount' = 'FungibleAccount';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface FungibleAccount {
  __typename: typeof FungibleAccountName;
  fungibleName: string;
  accountName: string;
  chainAccounts: FungibleChainAccount[];
  totalBalance: number;
  transactions: Transaction[];
  transfers: Transfer[];
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface GraphConfiguration {
  maximumConfirmationDepth: number;
  minimumBlockHeight: bigint;
}

export const NonFungibleChainAccountName: 'NonFungibleChainAccount' =
  'NonFungibleChainAccount';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface NonFungibleChainAccount {
  __typename: typeof NonFungibleChainAccountName;
  chainId: string;
  accountName: string;
  nonFungibles: Token[];
  transactions: Transaction[];
}

export const NonFungibleAccountName: 'NonFungibleAccount' =
  'NonFungibleAccount';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface NonFungibleAccount {
  __typename: typeof NonFungibleAccountName;
  accountName: string;
  chainAccounts: NonFungibleChainAccount[];
  transactions: Transaction[];
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Cmd {
  payload: ExecPayload | ContPayload;
  meta: Meta;
  // signers: Signer[];
  networkId: string;
  nonce: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ExecPayload {
  code: string | null;
  data: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ContPayload {
  pactId: string | null;
  step: number | null;
  rollback: boolean | null;
  data: string;
  proof: string | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Meta {
  sender: string;
  chainId: string;
  gasLimit: bigint;
  gasPrice: number;
  ttl: bigint;
  creationTime: Date;
}

// eslint-disable-next-line @typescript-eslint/naming-convention

export interface TransactionResult {
  badResult: string;
  continuation: string;
  gas: bigint;
  goodResult: string;
  height: bigint;
  logs: string | null;
  metadata: string;
  eventCount: bigint | null;
  transactionId: bigint | null;
}

// // eslint-disable-next-line @typescript-eslint/naming-convention
// export interface Signer {
//   publicKey: string;
//   address: string | null;
//   scheme: string | null;
//   clist: JsonValue;
// }
