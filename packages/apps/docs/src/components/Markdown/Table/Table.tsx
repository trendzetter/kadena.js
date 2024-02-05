import type { ITableV1Props } from '@kadena/react-ui';
import { TableV1 as StyledTable } from '@kadena/react-ui';
import type { FC } from 'react';
import React from 'react';
import { wrapperClass } from '../styles.css';

export const Table: FC<ITableV1Props> = ({ children }) => {
  return (
    <div className={wrapperClass}>
      <StyledTable.Root striped>{children}</StyledTable.Root>
    </div>
  );
};
