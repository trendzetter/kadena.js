import { useNetwork } from '@/modules/network/network.hook';
import {
  KadenaLogo,
  NavHeader,
  NavHeaderLinkList,
  NavHeaderSelect,
  SelectItem,
  SystemIcon,
  Text,
} from '@kadena/react-ui';
import { FC, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Layout: FC = () => {
  const { networks, activeNetwork, updateNetwork } = useNetwork();
  const [value, setValue] = useState(activeNetwork?.networkId);

  const handleNetworkUpdate = (value: string) => {
    setValue(value);
    const network = networks.find((network) => network.networkId === value);
    if (network) {
      updateNetwork(network);
    }
  };

  return (
    <>
      <NavHeader
        logo={
          <Link to="/">
            <KadenaLogo height={40} />
          </Link>
        }
      >
        <NavHeaderLinkList>
          <Link to="/">
            <Text bold>DX-Wallet</Text>
          </Link>
          <Link to="/networks">
            <Text bold>Network</Text>
          </Link>
        </NavHeaderLinkList>

        <NavHeaderSelect
          aria-label="Select Network"
          selectedKey={value}
          onSelectionChange={(value) => handleNetworkUpdate(value as string)}
          startIcon={<SystemIcon.Earth />}
        >
          {networks.map((network) => (
            <SelectItem key={network.networkId} textValue={network.name}>
              {network.name}
            </SelectItem>
          ))}
        </NavHeaderSelect>
      </NavHeader>

      <Outlet />
      <div id="modalportal"></div>
    </>
  );
};
