import { bloglist } from './styles.css';

import React, { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

export const BlogList: FC<IProps> = ({ children }) => {
  return (
    <section>
      <ul className={bloglist}>{children}</ul>
    </section>
  );
};
