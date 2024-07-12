import { useNetworkInfoQuery } from '@/__generated__/sdk';
import { Media } from '@/components/layout/media';
import { useToast } from '@/components/toasts/toast-context/toast-context';
import { formatStatisticsData } from '@/services/format';
import { Grid, Stack, Text } from '@kadena/kode-ui';
import { atoms } from '@kadena/kode-ui/styles';
import type { FC } from 'react';
import React, { useEffect } from 'react';

const StatisticsGrid: FC = () => {
  const { addToast } = useToast();
  const { data: statisticsData, error } = useNetworkInfoQuery({
    pollInterval: 5000,
  });

  useEffect(() => {
    if (error) {
      addToast({
        type: 'negative',
        label: 'Something went wrong',
        body: 'Loading of network info data failed',
      });
    }
  }, [error]);

  const statisticsGridData = formatStatisticsData(statisticsData?.networkInfo);

  return (
    <Media lessThan="md">
      <Grid columns={2} borderStyle="solid" borderWidth="hairline">
        {statisticsGridData.map((item) => (
          <Stack
            flexDirection={'column'}
            alignItems={'center'}
            padding={'sm'}
            borderStyle="solid"
            borderWidth="hairline"
            key={`statistic-stack-${item.label}`}
          >
            <Text variant="code">{item.value}</Text>
            <Text
              variant="code"
              bold
              size="smallest"
              className={atoms({
                flexWrap: 'nowrap',
              })}
            >
              {item.label}
            </Text>
          </Stack>
        ))}
      </Grid>
    </Media>
  );
};

export default StatisticsGrid;
