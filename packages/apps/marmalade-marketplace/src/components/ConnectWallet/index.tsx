import SpireKeyKdacolorLogoWhite from '@/components/SpireKeyKdacolorLogoWhite';
import useClickOutside from '@/hooks/useClickOutside';
import { MonoAccountCircle, MonoMoreVert } from '@kadena/kode-icons/system';
import {
  Badge,
  Button,
  ContextMenu,
  ContextMenuItem,
  Media,
} from '@kadena/kode-ui';
import React, { FC, useState } from 'react';
import * as styles from './style.css';

interface ConnectWalletProps {
  showContextMenu: boolean;
  account?: string;
  accountAlias?: string;
  menuItems?: ContextMenuItems[];
}

interface ContextMenuItems {
  title: string;
  onClick: () => void;
  key: string;
  startVisual?: React.ReactNode;
}

const ConnectWallet: FC<ConnectWalletProps> = ({
  showContextMenu = false,
  account,
  accountAlias,
  menuItems,
}) => {
  const ref: React.RefObject<HTMLDivElement> = React.createRef();

  return (
    <>
      <div className={styles.connectWalletContainer}>
        <Media greaterThanOrEqual="lg">
          <Button
            className={styles.walletButton}
            variant="primary"
            isCompact={false}
            startVisual={
              <SpireKeyKdacolorLogoWhite style={{ color: 'black' }} />
            }
          >
            {accountAlias?.slice(0, 10) + '...' + accountAlias?.slice(-3)}
          </Button>
        </Media>
        {showContextMenu && (
          <ContextMenu trigger={<Button endVisual={<MonoAccountCircle />} />}>
            {menuItems?.map((item) => (
              <ContextMenuItem
                label={item.title}
                onClick={() => {
                  item.onClick();
                }}
              />
            ))}
          </ContextMenu>
        )}
      </div>
    </>
  );
};

export default ConnectWallet;
