import {
  useCompletedBlockHeightsQuery,
  useLastBlockHeightQuery,
  useNewBlocksSubscription,
} from '@/__generated__/sdk';
import { useQueryContext } from '@/context/query-context';
import { newBlocks } from '@/graphql/subscriptions/newBlocks.graph';
import type { IBlockData, IChainBlock } from '@/services/block';
import { addBlockData } from '@/services/block';
import { Stack } from '@kadena/kode-ui';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import BlockTableHeader from './block-header/block-header';
import { blockHeaderFixedClass } from './block-header/block-header.css';
import { useBlockInfo } from './block-info-context/block-info-context';
import BlockRow from './block-row/block-row';
import { blockDataLoading } from './loading-data';

export const startColumns = [
  { title: 'Chain', subtitle: 'Number' },
  { title: 'Chain', subtitle: 'Difficulty' },
];

const endColumn = { title: 'Block', subtitle: 'Activity' };

const getmaxBlockTxCount = (blockData: IChainBlock): number => {
  const txCounts = Math.max(
    ...Object.entries(blockData)
      .map(([, chain]) => {
        return Object.entries(chain).map(([, block]) => {
          return (block as IBlockData).txCount;
        });
      })
      .flat(),
  );

  return txCounts;
};

const blockHeightsLoading = [0, 1, 2, 3];

const BlockTable: React.FC = () => {
  const { data: newBlocksData, loading: newBlocksLoading } =
    useNewBlocksSubscription();
  const { data: lastBlockHeight, loading: lastBlockLoading } =
    useLastBlockHeightQuery();
  const { data: oldBlocksData, loading: oldBlocksLoading } =
    useCompletedBlockHeightsQuery({
      variables: {
        // Change this if the table needs to show more than 80 blocks at once (on startup)
        first: 80,
        // We don't want only completed heights
        completedHeights: false,
        heightCount: 4,
      },
    });

  const { selectedHeight } = useBlockInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [blockData, setBlockData] = useState<IChainBlock>({});
  const [maxBlockTxCount, setmaxBlockTxCount] = useState(0);
  const [blockHeights, updateBlockHeights] = useState<number[]>([1, 2, 3, 4]);
  const [blockHeightsClean, updateBlockHeightsClean] = useState<number[]>([
    1, 2, 3, 4,
  ]);

  const { ref, inView } = useInView({
    rootMargin: '-160px 0px 0px 0px',
    initialInView: true,
  });

  useEffect(() => {
    if (isMounted) return;

    if (newBlocksLoading || lastBlockLoading || oldBlocksLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setIsMounted(true);
      }, 200);
    }
  }, [
    isLoading,
    isMounted,
    newBlocksLoading,
    lastBlockLoading,
    oldBlocksLoading,
  ]);

  useEffect(() => {
    if (lastBlockHeight?.lastBlockHeight) {
      const newBlockHeights = Array.from(
        { length: 4 },
        (_, i) => lastBlockHeight.lastBlockHeight - i,
      ).reverse();

      //updateBlockHeights(newBlockHeights);
      updateBlockHeightsClean(newBlockHeights);
    }
  }, [lastBlockHeight]);

  useEffect(() => {
    if (oldBlocksData) {
      const updatedBlockData = addBlockData(blockData, oldBlocksData);
      setBlockData(updatedBlockData);
    }
  }, [oldBlocksData]);

  useEffect(() => {
    if (newBlocksData) {
      const updatedBlockData = addBlockData(blockData, newBlocksData);
      setBlockData(updatedBlockData);
      setmaxBlockTxCount(getmaxBlockTxCount(updatedBlockData));
      if (!newBlocksData.newBlocks) return;

      const newMaxHeight = Math.max(
        ...newBlocksData.newBlocks.map((block) => block.height),
      );

      if (newMaxHeight > blockHeights[3]) {
        const newBlockHeights = Array.from(
          { length: 4 },
          (_, i) => newMaxHeight - i,
        ).reverse();

        //updateBlockHeights(newBlockHeights);
        updateBlockHeightsClean(newBlockHeights);
      }
    }
  }, [newBlocksData]);

  useEffect(() => {
    if (selectedHeight && !blockHeightsClean.includes(selectedHeight?.height)) {
      blockHeightsClean[0] = selectedHeight?.height;
      updateBlockHeights(blockHeightsClean);
    } else {
      updateBlockHeights(blockHeightsClean);
    }
  }, [selectedHeight, newBlocksData]);

  const { setQueries } = useQueryContext();
  useEffect(() => {
    setQueries([
      {
        query: newBlocks,
      },
    ]);
  }, []);

  return (
    <>
      <Stack
        className={!inView ? blockHeaderFixedClass : ''}
        display="flex"
        flexDirection={'column'}
        paddingInline={{ xs: 'xs', md: 'lg' }}
        width="100%"
      >
        <BlockTableHeader
          isLoading={isLoading}
          startColumns={startColumns}
          heightColumns={isLoading ? blockHeightsLoading : blockHeights}
          endColumn={endColumn}
        />
      </Stack>
      <Stack
        display="flex"
        flexDirection={'column'}
        gap={'sm'}
        paddingInline={{ xs: 'xs', md: 'lg' }}
        width="100%"
      >
        <span ref={ref} style={{ height: 0 }} />
        {!inView && <Stack marginBlock="xxl" />}
        {Object.keys(isLoading ? blockDataLoading : blockData).map(
          (chainId) => (
            <BlockRow
              isLoading={isLoading}
              key={chainId}
              blockRowData={
                isLoading
                  ? blockDataLoading[Number(chainId)]
                  : blockData[Number(chainId)]
              }
              heights={isLoading ? blockHeightsLoading : blockHeights}
              chainId={Number(chainId)}
              maxBlockTxCount={maxBlockTxCount}
            />
          ),
        )}
      </Stack>
    </>
  );
};

export default BlockTable;
