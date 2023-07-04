import {
  ICapabilityItem,
  IContinuationPayload,
  IExecPayload,
} from '../../interfaces/IPactCommand';

interface IPayload {
  exec: <
    T extends Array<{
      capability(name: string, ...args: unknown[]): ICapabilityItem;
    }>,
  >(
    ...codes: [...T]
  ) => // use _branch to add type inferring for using it when user call signer function then we can show a related list of capabilities
  { payload: IExecPayload & { funs: [...T]; _brand: 'exec' } };
  cont: (options: IContinuationPayload) => {
    payload: IContinuationPayload & { _brand: 'cont' };
  };
}

/**
 * @alpha
 */
export const payload: IPayload = {
  exec: (...codes) => {
    const pld: IExecPayload = { code: codes.join('') };
    return {
      payload: pld,
      // _brand is a trick to make the type inferring work but it's not a real field in the payload
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  },
  cont: (options) => ({
    // _brand is a trick to make the type inferring work but it's not a real field in the payload
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: options as any,
  }),
};
