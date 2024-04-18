import SchemaBuilder from '@pothos/core';
import ComplexityPlugin from '@pothos/plugin-complexity';
import DataloaderPlugin from '@pothos/plugin-dataloader';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import RelayPlugin from '@pothos/plugin-relay';
import TracingPlugin, { wrapResolver } from '@pothos/plugin-tracing';
import ValidationPlugin from '@pothos/plugin-validation';
import { Prisma } from '@prisma/client';
import { logTrace } from '@services/tracing/trace-service';
import { dotenv } from '@utils/dotenv';
import { normalizeError } from '@utils/errors';
import {
  BigIntResolver,
  DateTimeResolver,
  NonNegativeFloatResolver,
  PositiveFloatResolver,
} from 'graphql-scalars';
import type { IncomingMessage } from 'http';
import { prismaClient } from '../db/prisma-client';
import type {
  IContinuationPayload,
  IExecutionPayload,
  IFungibleAccount,
  IFungibleChainAccount,
  IGasLimitEstimation,
  IGraphConfiguration,
  IGuard,
  INonFungibleAccount,
  INonFungibleChainAccount,
  INonFungibleToken,
  INonFungibleTokenBalance,
  IPactQueryResponse,
  ITransactionCapability,
  ITransactionCommand,
  ITransactionMempoolInfo,
  ITransactionMeta,
  ITransactionResult,
  ITransactionSignature,
} from './types/graphql-types';

interface IDefaultTypesExtension {
  Scalars: {
    BigInt: {
      Input: bigint;
      Output: bigint;
    };
    DateTime: {
      Input: Date;
      Output: Date;
    };
    Decimal: {
      Input: number;
      Output: number;
    };
    PositiveFloat: {
      Input: number;
      Output: number;
    };
  };
}

export interface IContext {
  req: IncomingMessage;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extensions: any;
}

export const PRISMA = {
  DEFAULT_SIZE: 20,
};

export const builder = new SchemaBuilder<
  IDefaultTypesExtension & {
    PrismaTypes: PrismaTypes;
    Context: IContext;
    Objects: {
      FungibleAccount: IFungibleAccount;
      FungibleChainAccount: IFungibleChainAccount;
      GasLimitEstimation: IGasLimitEstimation;
      GraphConfiguration: IGraphConfiguration;
      Guard: IGuard;
      NonFungibleAccount: INonFungibleAccount;
      NonFungibleChainAccount: INonFungibleChainAccount;
      NonFungibleTokenBalance: INonFungibleTokenBalance;
      NonFungibleToken: INonFungibleToken;
      TransactionMeta: ITransactionMeta;
      ExecutionPayload: IExecutionPayload;
      ContinuationPayload: IContinuationPayload;
      TransactionMempoolInfo: ITransactionMempoolInfo;
      TransactionResult: ITransactionResult;
      TransactionCommand: ITransactionCommand;
      TransactionCapability: ITransactionCapability;
      TransactionSignature: ITransactionSignature;
      PactQueryResponse: IPactQueryResponse;
    };
  }
>({
  plugins: [
    ComplexityPlugin,
    DataloaderPlugin,
    PrismaPlugin,
    RelayPlugin,
    TracingPlugin,
    ValidationPlugin,
  ],

  prisma: {
    client: prismaClient,
    dmmf: Prisma.dmmf,
    // uses /// comments from schema.prisma as descriptions
    exposeDescriptions: false,
    // use where clause from prismaRelatedConnection for totalCount
    filterConnectionTotalCount: true,
  },

  relayOptions: {
    clientMutationId: 'optional',
    cursorType: 'String',
  },

  validationOptions: {
    validationError: (message) => normalizeError(message),
  },

  ...(dotenv.COMPLEXITY_ENABLED && {
    complexity: {
      limit: {
        complexity: dotenv.COMPLEXITY_LIMIT,
      },
    },
  }),

  ...(dotenv.TRACING_ENABLED && {
    tracing: {
      default: () => true,
      wrap: (resolver, __options, config) => (parent, args, ctx, info) => {
        return wrapResolver(resolver, async (__error, duration) => {
          await logTrace(config.parentType, config.name, duration);

          ctx.extensions.tracing = {
            ...ctx.extensions.tracing,
            [`${config.parentType}.${config.name}`]: duration,
          };
        })(parent, args, ctx, info);
      },
    },
  }),
});

type ScalarTypeResolver<TScalarInputShape, TScalarOutputShape> =
  PothosSchemaTypes.ScalarTypeOptions<
    PothosSchemaTypes.ExtendDefaultTypes<IDefaultTypesExtension>,
    TScalarInputShape,
    TScalarOutputShape
  >;

// Defines the custom scalars
const SCALARS = [
  ['BigInt', BigIntResolver],
  ['DateTime', DateTimeResolver],
  ['Decimal', NonNegativeFloatResolver],
  ['PositiveFloat', PositiveFloatResolver],
] as const;

// add the custom scalars
SCALARS.forEach(([name, resolver]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  builder.scalarType(name, resolver as ScalarTypeResolver<any, any>);
});
