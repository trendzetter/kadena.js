import type {
  FungibleAccountTransfersConnection,
  FungibleChainAccountTransfersConnection,
  Transfer,
} from '@/__generated__/sdk';
import routes from '@constants/routes';
import {
  Box,
  Cell,
  Column,
  ContentHeader,
  Link,
  Row,
  Table,
  TableBody,
  TableHeader,
} from '@kadena/react-ui';
import { atoms } from '@kadena/react-ui/styles';
import { truncate } from '@utils/truncate';
import React from 'react';
import { compactTableClass } from '../common/compact-table/compact-table.css';
interface ICompactTransfersTableProps {
  fungibleName: string;
  accountName: string;
  chainId?: string;
  truncateColumns?: boolean;
  transfers:
    | FungibleAccountTransfersConnection
    | FungibleChainAccountTransfersConnection;

  description?: string;
}

interface XChainTransfer {
  startingTransfer: Transfer;
  finishingTransfer: Transfer;
}

export const CompactTransfersTable = (
  props: ICompactTransfersTableProps,
): JSX.Element => {
  const {
    fungibleName,
    accountName,
    chainId,
    truncateColumns,
    transfers,
    description,
  } = props;

  // This function determines if the transfer is the starting one or the finishing one
  const determineXChainTransferOrder = (
    transfer: Transfer,
    crossChainTransfer: Transfer,
  ): XChainTransfer => {
    if (transfer.transaction?.pactId) {
      // This means that the transfer on this chain is the finishing one
      return {
        startingTransfer: crossChainTransfer,
        finishingTransfer: transfer,
      };
    } else {
      return {
        startingTransfer: transfer,
        finishingTransfer: crossChainTransfer,
      };
    }
  };

  return (
    <>
      <ContentHeader
        heading="Transfers"
        icon="KIcon"
        description={
          description ? description : 'All transfers from this fungible'
        }
      />
      <Box margin="sm" />
      <Link
        isCompact
        href={`${routes.ACCOUNT_TRANSFERS}/${fungibleName}/${accountName}${
          chainId !== undefined ? `?chain=${chainId}` : ''
        }`}
      >
        View all transfers
      </Link>
      <Box margin="xs" />
<<<<<<< HEAD
      <Table.Root wordBreak="break-word" className={compactTableClass}>
        <Table.Head>
          <Table.Tr>
            <Table.Th>Chain</Table.Th>
            <Table.Th>Timestamp</Table.Th>
            <Table.Th>Block Height</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Sender Account</Table.Th>
            <Table.Th>Receiver Account</Table.Th>
            <Table.Th>Request key</Table.Th>
          </Table.Tr>
        </Table.Head>
        <Table.Body>
=======
      <Table className={atoms({ wordBreak: 'break-all' })}>
        <TableHeader>
          <Column>Chain</Column>
          <Column>Block Height</Column>
          <Column>Amount</Column>
          <Column>Sender Account</Column>
          <Column>Receiver Account</Column>
          <Column>Request key</Column>
        </TableHeader>
        <TableBody>
>>>>>>> 0e5aaafd1 (updated tools)
          {transfers.edges.map((edge, index) => {
            let transfer = edge.node;
            let crossChainCounterPart = edge.node.crossChainTransfer;

            if (!chainId) {
              /**  These transfers are going to be added to their crosschain counterpart and
             this way we avoid repeated transfers in the table */
              if (transfer.transaction?.pactId) return <></>;
            } else {
              if (crossChainCounterPart) {
                const { startingTransfer, finishingTransfer } =
                  determineXChainTransferOrder(transfer, crossChainCounterPart);
                transfer = startingTransfer;
                crossChainCounterPart = finishingTransfer;
              }
            }

            const chainIdDisplay = crossChainCounterPart
              ? `${transfer.chainId} / ${crossChainCounterPart.chainId}`
              : transfer.chainId;

            const heightDisplay = crossChainCounterPart
              ? `${transfer.height} / ${crossChainCounterPart.height}`
              : transfer.height;

            return (
<<<<<<< HEAD
              <Table.Tr key={index}>
                <Table.Td>{chainIdDisplay}</Table.Td>
                <Table.Td>
                  {new Date(transfer.creationTime).toLocaleString()}
                </Table.Td>
                <Table.Td>{heightDisplay}</Table.Td>
                <Table.Td>{transfer.amount}</Table.Td>
                <Table.Td>
=======
              <Row key={index}>
                <Cell>{chainIdDisplay}</Cell>
                <Cell>{heightDisplay}</Cell>
                <Cell>{transfer.amount}</Cell>
                <Cell>
>>>>>>> 0e5aaafd1 (updated tools)
                  <Link
                    href={`${routes.ACCOUNT}/${fungibleName}/${transfer.senderAccount}`}
                  >
                    <span title={transfer.senderAccount}>
                      {truncateColumns
                        ? truncate(transfer.senderAccount)
                        : transfer.senderAccount}
                    </span>
                  </Link>
                </Cell>
                <Cell>
                  {!crossChainCounterPart ? (
                    <Link
                      href={`${routes.ACCOUNT}/${fungibleName}/${transfer.receiverAccount}`}
                    >
                      <span title={transfer.receiverAccount}>
                        {truncateColumns
                          ? truncate(transfer.receiverAccount)
                          : transfer.receiverAccount}
                      </span>
                    </Link>
                  ) : (
                    <Link
                      href={`${routes.ACCOUNT}/${fungibleName}/${crossChainCounterPart.receiverAccount}`}
                    >
                      <span title={crossChainCounterPart.receiverAccount}>
                        {truncateColumns
                          ? truncate(crossChainCounterPart.receiverAccount)
                          : crossChainCounterPart.receiverAccount}
                      </span>
                    </Link>
                  )}
                </Cell>
                <Cell>
                  <Link href={`${routes.TRANSACTIONS}/${transfer.requestKey}`}>
                    <span title={transfer.requestKey}>
                      {truncateColumns
                        ? truncate(transfer.requestKey)
                        : transfer.requestKey}
                    </span>
                  </Link>
                  {crossChainCounterPart && (
                    <>
                      <span> / </span>
                      <Link
                        href={`${routes.TRANSACTIONS}/${crossChainCounterPart.requestKey}`}
                      >
                        <span title={crossChainCounterPart.requestKey}>
                          {truncateColumns
                            ? truncate(crossChainCounterPart.requestKey)
                            : crossChainCounterPart.requestKey}
                        </span>
                      </Link>
                    </>
                  )}
                </Cell>
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
