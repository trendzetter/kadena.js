import type { AccountQuery, BlockQuery } from '@/__generated__/sdk';
import { loadingData } from '../loadingDataAccountquery';
import { loadingData as loadingBlockData } from '../loadingDataBlockquery';

describe('loading data', () => {
  describe('loadingDataAccountquery', () => {
    it('should return the correct type', () => {
      expectTypeOf(loadingData).toBeObject();

      expectTypeOf(loadingData).toMatchTypeOf<AccountQuery>();
    });
  });
  describe('loadingDataBlockquery', () => {
    it('should return the correct type', () => {
      expectTypeOf(loadingBlockData).toBeObject();

      expectTypeOf(loadingBlockData).toMatchTypeOf<BlockQuery>();
    });
  });
});
