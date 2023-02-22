/* eslint-disable */
/**
 * @alpha
 */
export interface ISignature {
  // eslint-disable-next-line @rushstack/no-new-null
  sig: string | undefined | null;
}

/**
 * @alpha
 */
export interface ISignedSignatureWithHash extends ISignature {
  hash: string;
  // eslint-disable-next-line @rushstack/no-new-null
  sig: string | undefined | null;
  pubKey: string;
}

/**
 * @alpha
 */
export interface IUnsignedSignatureWithHash extends ISignature {
  hash: string;
  // eslint-disable-next-line @rushstack/no-new-null
  sig: string | undefined | null;
  pubKey?: string;
}

/**
 * @alpha
 */
export type SignatureWithHash =
  | ISignedSignatureWithHash
  | IUnsignedSignatureWithHash;

/**
 * @alpha
 */
export type SignCommand = SignatureWithHash;

/**
 * @alpha
 */
export interface ISignedCommand {
  hash: string;
  sigs: ISignature[];
  cmd: string;
}
