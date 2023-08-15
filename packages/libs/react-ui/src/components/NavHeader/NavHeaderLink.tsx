import { activeLinkClass, linkClass } from './NavHeader.css';
import { INavItem } from './NavHeaderNavigation';

import classNames from 'classnames';
import React, { FC } from 'react';

export const NavHeaderLink: FC<INavItem & { children?: string }> = ({
  active,
  children,
  href,
  target,
  onClick,
}) => {
  return (
    <a
      className={classNames(linkClass, {
        [activeLinkClass]: active,
        'nav-item': true,
      })}
      href={href}
      target={target}
      onClick={onClick}
    >
      {children}
    </a>
  );
};
