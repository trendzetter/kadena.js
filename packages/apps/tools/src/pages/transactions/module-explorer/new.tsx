import type { ChainwebChainId } from '@kadena/chainweb-node-client';
import { CHAINS } from '@kadena/chainweb-node-client';
import {
  Box,
  Card,
  Grid,
  Heading,
  SystemIcon,
  Text,
  TextField,
} from '@kadena/react-ui';

import ModulesTable from './modules-table';

import { ChainSelect } from '@/components/Global';
import type { Network } from '@/constants/kadena';
import { kadenaConstants } from '@/constants/kadena';
import {
  DefaultValues,
  StorageKeys,
  useWalletConnectClient,
} from '@/context/connect-wallet-context';
import { describeModule } from '@/services/modules/describe-module';
import { listModules } from '@/services/modules/list-module';
import { transformModulesRequest } from '@/services/utils/transform';
import { getName, parse } from '@/utils/persist';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect, useState, useTransition } from 'react';

const AceViewer = dynamic(import('@/components/Global/Ace'), {
  ssr: false,
});

export interface IModule {
  chainId: ChainwebChainId;
  moduleName: string;
}

export const getModules = async (network: Network): Promise<IModule[]> => {
  const promises = CHAINS.map((chain) => {
    return listModules(
      chain,
      network,
      kadenaConstants.DEFAULT_SENDER,
      kadenaConstants.GAS_PRICE,
      1000,
    );
  });

  const results = await Promise.all(promises);

  const transformed = results.map((result) => transformModulesRequest(result));
  const flattened = transformed.flat();
  const sorted = flattened.sort((a, b) => {
    if (a.moduleName === b.moduleName) {
      return parseInt(a.chainId, 10) - parseInt(b.chainId, 10);
    }
    return a.moduleName.localeCompare(b.moduleName);
  });

  return sorted;
};

export const getServerSideProps: GetServerSideProps<{
  data: Array<{ chainId: ChainwebChainId; moduleName: string }>;
}> = async (context) => {
  // TODO: Tidy this up
  const network: Network =
    parse(
      context.req.cookies[encodeURIComponent(getName(StorageKeys.NETWORK))] ||
        '',
    ) || DefaultValues.NETWORK;

  const modules = await getModules(network);

  return {
    props: {
      data: modules,
    },
  };
};

const NewPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [text, setText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const onChange = (e) => {
    setText(e.target.value);
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  };

  const [chainID, setChainID] = useState<ChainwebChainId | ''>('');

  const [selectedModule, setSelectedModule] = useState<IModule>();
  const { selectedNetwork: network } = useWalletConnectClient();

  const [modules, setModules] = useState(data);

  useEffect(() => {
    const fetchModules = async (): Promise<void> => {
      const results = await getModules(network);
      setModules(results);
    };
    fetchModules().catch(console.error);
  }, [network]);

  const [code, setCode] = useState<string>('');

  useEffect(() => {
    const fetchModule = async (): Promise<void> => {
      if (!selectedModule) {
        return;
      }

      const result = await describeModule(
        selectedModule.moduleName,
        selectedModule.chainId,
        network,
        kadenaConstants.DEFAULT_SENDER,
        kadenaConstants.GAS_PRICE,
        1000,
      );

      if (result.result.status === 'failure') {
        // TODO: do something
        return;
      }

      setCode((result.result.data as unknown as { code: string }).code);
    };

    fetchModule().catch(console.error);
  }, [network, selectedModule]);

  return (
    <Grid.Root columns={2}>
      <Grid.Item>
        <Card fullWidth>
          <Heading as="h4">
            {selectedModule ? selectedModule.moduleName : 'Select a module'}
            {selectedModule ? (
              <Box display={'inline-block'}>
                <SystemIcon.Link display={'inline-block'} />
              </Box>
            ) : null}
            {selectedModule ? selectedModule.chainId : null}
          </Heading>
          <AceViewer code={code} />
        </Card>
      </Grid.Item>
      <Grid.Item>
        <Card fullWidth>
          <Grid.Root columns={2}>
            <Grid.Item>
              <TextField
                label="Search"
                inputProps={{
                  id: 'something',
                  placeholder: 'Module name',
                  onChange,
                  value: text,
                }}
              />
            </Grid.Item>
            <Grid.Item>
              <ChainSelect
                includeEmpty
                onChange={(value) => setChainID(value)}
                value={chainID}
                ariaLabel="Select Chain ID"
              />
            </Grid.Item>
          </Grid.Root>
          {isPending && <Text>Loading...</Text>}
          <ModulesTable
            modules={modules}
            searchQuery={searchQuery}
            chainID={chainID}
            onModuleClick={setSelectedModule}
          />
        </Card>
      </Grid.Item>
    </Grid.Root>
  );
};

export default NewPage;
