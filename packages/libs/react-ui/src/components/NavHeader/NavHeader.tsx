import { Link } from '@components/Link';
import {
  containerClass,
  linkClass,
  logoClass,
  navClass,
} from './NavHeader.css';

import React, { FC } from 'react';
import Logo, { LogoVariant, logoVariants } from '@components/Logo';

export type INavItemTarget = '_self' | '_blank';
export type INavItem = { title: string; href: string; target?: INavItemTarget };
export type INavItems = INavItem[];

export interface INavHeaderProps {
  brand?: LogoVariant;
  items?: INavItems;
}

export const NavHeader: FC<INavHeaderProps> = ({
  brand = logoVariants[0],
  items,
}) => {
  return (
    <header className={containerClass} data-testid="kda-navheader">
      <div className={logoClass}>
        <Link.Root href="/" target="_self">
          <Logo variant={brand} />
        </Link.Root>
      </div>
      <nav className={navClass}>
        {items &&
          items.map((item, index) => {
            return (
              <a
                className={linkClass}
                href={item.href}
                target={item.target}
                key={`navItem-${index}`}
              >
                {item.title}
              </a>
            );
          })}
      </nav>
    </header>
  );
};
