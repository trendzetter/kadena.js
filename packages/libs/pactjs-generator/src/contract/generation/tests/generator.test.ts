import { generateDts } from '../generator';
import { StringContractDefinition } from '../StringContractDefinition';

describe('generator', () => {
  it('creates a typescript definition from a contract', () => {
    const contract: string = `(module coin
      (defun transfer:string (from:string to:string amount:decimal))
    )`;
    const parsedContract = new StringContractDefinition(contract);
    const dTs = generateDts(parsedContract.modulesWithFunctions)
      .get('coin')!
      .split(/[\s\n]/)
      .filter((x) => x !== '')
      .join(' ');
    const expected =
      `import type { ICommandBuilder, IPactCommand } from '@kadena/client';
declare module '@kadena/client' {
  export type ICoinCaps = { }
  export interface IPactModules {
    "coin": {
      "transfer": (from: string, to: string, amount: number) => ICommandBuilder<ICoinCaps> & IPactCommand
    }
  }
}`
        .split(/[\s\n]/)
        .filter((x) => x !== '')
        .join(' ');
    expect(dTs).toBe(expected);
  });

  it('creates a typescript definition with DEFCAPS from a contract', () => {
    const contract: string = `(module coin
      (defun transfer:string (from:string to:string amount:decimal))
      (defcap GAS ())
      (defcap TRANSFER (sender:string receiver:string amount:decimal))
    )`;
    const parsedContract = new StringContractDefinition(contract);
    const dTs = generateDts(parsedContract.modulesWithFunctions)
      .get('coin')!
      .split(/[\s\n]/)
      .filter((x) => x !== '')
      .join(' ');
    const expected =
      `import type { ICommandBuilder, IPactCommand } from '@kadena/client';
declare module '@kadena/client' {
  export type ICoinCaps = {
    "coin.GAS": [ ],
    "coin.TRANSFER": [ sender: string, receiver: string, amount: number ]
  }
  export interface IPactModules {
    "coin": {
      "transfer": (from: string, to: string, amount: number) => ICommandBuilder<ICoinCaps> & IPactCommand
    }
  }
}`
        .split(/[\s\n]/)
        .filter((x) => x !== '')
        .join(' ');
    expect(dTs).toBe(expected);
  });

  it('creates a typescript definition without incompatible types', () => {
    const contract: string = `(module module-with-dashes
      (defun transfer:string (from:string to:string amount))
    )`;

    const parsedContract = new StringContractDefinition(contract);
    const dTs = generateDts(parsedContract.modulesWithFunctions)
      .get('module-with-dashes')!
      .split(/[\s\n]/)
      .filter((x) => x !== '')
      .join(' ');

    const expected =
      `import type { ICommandBuilder, IPactCommand } from '@kadena/client';
declare module '@kadena/client' {
  export type IModuleWithDashesCaps = {
  }
  export interface IPactModules {
    "module-with-dashes": {
      "transfer": (from: string, to: string, amount: any) => ICommandBuilder<IModuleWithDashesCaps> & IPactCommand
    }
  }
}`
        .split(/[\s\n]/)
        .filter((x) => x !== '')
        .join(' ');
    expect(dTs).toBe(expected);
  });

  it('creates a typescript definition without incompatible types', () => {
    const contract: string = `(module module-with-dashes
  (defun transfer:string (from:string to:string amount))
  (defcap GAS ())
  (defcap TRANSFER (from:string to:string amount))
)`;

    const parsedContract = new StringContractDefinition(contract);
    generateDts(parsedContract.modulesWithFunctions);
    const contractCaps = parsedContract.getCapabilities('module-with-dashes')!;
    const contractMethods = parsedContract.getMethods('module-with-dashes')!;

    expect(Object.keys(contractCaps)).toEqual(['GAS', 'TRANSFER']);
    expect(Object.keys(contractCaps.TRANSFER.args)).toEqual([
      'from',
      'to',
      'amount',
    ]);
    expect(Object.keys(contractMethods)).toEqual(['transfer']);
    expect(Object.keys(contractMethods.transfer.args)).toEqual([
      'from',
      'to',
      'amount',
    ]);
    expect(parsedContract.modules).toEqual(['module-with-dashes']);
  });
});
