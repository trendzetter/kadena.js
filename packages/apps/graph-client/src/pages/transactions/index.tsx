import { Box, Breadcrumbs } from '@kadena/react-ui';

import { useGetTransactionsQuery } from '@/__generated__/sdk';
import Loader from '@/components/Common/loader/loader';
import { ErrorBox } from '@/components/error-box/error-box';
import { ExtendedTransactionsTable } from '@/components/extended-transactions-table/extended-transactions-table';
import routes from '@/constants/routes';
import React from 'react';

const Transactions: React.FC = () => {
  const { loading, data, error, fetchMore } = useGetTransactionsQuery({
    variables: { first: 20 },
  });

  return (
    <>
      <Breadcrumbs.Root>
        <Breadcrumbs.Item href={`${routes.HOME}`}>Home</Breadcrumbs.Item>
        <Breadcrumbs.Item>Transactions</Breadcrumbs.Item>
      </Breadcrumbs.Root>

      <Box marginBottom="$8" />

      {loading && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Loader /> <span>Retrieving transactions...</span>
        </div>
      )}
      {error && <ErrorBox error={error} />}
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
