import { Box, Breadcrumbs, Stack } from '@kadena/react-ui';

import { useGetTransactionsQuery } from '@/__generated__/sdk';
import { ExtendedTransactionsTable } from '@/components/extended-transactions-table/extended-transactions-table';
import { GraphQLQueryDialog } from '@/components/graphql-query-dialog/graphql-query-dialog';
import LoaderAndError from '@/components/loader-and-error/loader-and-error';
import routes from '@/constants/routes';
import { getTransactions } from '@/graphql/queries.graph';
import React from 'react';

const Transactions: React.FC = () => {
  const variables = { first: 20 };

  const { loading, data, error, fetchMore } = useGetTransactionsQuery({
    variables,
  });

  return (
    <>
      <Stack justifyContent="space-between">
        <Breadcrumbs.Root>
          <Breadcrumbs.Item href={`${routes.HOME}`}>Home</Breadcrumbs.Item>
          <Breadcrumbs.Item>Transactions</Breadcrumbs.Item>
        </Breadcrumbs.Root>
        <GraphQLQueryDialog queries={[{ query: getTransactions, variables }]} />
      </Stack>

      <Box margin="md" />

      <LoaderAndError
        error={error}
        loading={loading}
        loaderText="Retrieving transactions..."
      />

      {data?.transactions && (
        <ExtendedTransactionsTable
          transactions={data.transactions}
          fetchMore={fetchMore}
        />
      )}
    </>
  );
};

export default Transactions;
