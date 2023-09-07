import { default as NextLink } from 'next/link';
import type { FC, ReactNode } from 'react';
import React from 'react';

interface IProp {
  children: ReactNode;
  href: string;
}

export const Link: FC<IProp> = ({ children, href, ...props }) => {
  if (typeof children === 'string' && !href.includes('http')) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    );
  }

  return (
    <a {...props} href={href}>
      {children}
    </a>
  );
};
