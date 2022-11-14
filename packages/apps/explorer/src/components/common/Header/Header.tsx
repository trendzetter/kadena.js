import { ISearchProps } from '../Layout/Layout';

import KadenaLogo from './components/KadenaLogo/KadenaLogo';
import Logo from './components/Logo/Logo';
import Menu from './components/Menu/Menu';
import Search from './components/Search/Search';
import s from './Header.module.css';

import { SearchType } from 'network/search';
import React, { FC, memo, useCallback } from 'react';

const Header: FC<
  ISearchProps & { type: SearchType; setType: (type: SearchType) => void }
> = ({
  searchRequestValue,
  searchValue,
  setSearchValue,
  topScroll,
  isFocused,
  setIsFocused,
  type,
  setType,
}) => {
  const onItemClick = useCallback(() => setSearchValue(''), [setSearchValue]);
  return (
    <header
      className={`${s.rootContainer} headerTop`}
      style={{
        background: `rgba(23, 13, 40, ${topScroll && topScroll / 90})`,
      }}
    >
      <div className={s.rootContentContainer}>
        <Logo />
        <div className={s.centralContainer}>
          <Search
            searchRequestValue={searchRequestValue}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            type={type}
            setType={setType}
          />
          <Menu onItemClick={onItemClick} />
        </div>
        <KadenaLogo id="desktop" width={64} height={71} />
      </div>
    </header>
  );
};

export default memo(Header);
