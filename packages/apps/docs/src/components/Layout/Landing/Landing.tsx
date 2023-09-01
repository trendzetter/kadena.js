import {
  articleClass,
  contentClass,
  contentClassVariants,
  TitleHeader,
} from '../components';
import { Template } from '../components/Template';
import { globalClass } from '../global.css';

import { PageGrid } from './styles';

import { NotFound } from '@/components/NotFound';
import { IBasePageProps } from '@/types/Layout';
import classNames from 'classnames';
import React, { FC } from 'react';

export const Landing: FC<IBasePageProps> = ({
  children,
  frontmatter,
  leftMenuTree,
}) => {
  return (
    <PageGrid className={globalClass}>
      <Template menuItems={leftMenuTree} layout="landing">
        <TitleHeader
          title={frontmatter.title}
          subTitle={frontmatter.subTitle}
          icon={frontmatter.icon}
        />

        <div
          id="maincontent"
          className={classNames(contentClass, contentClassVariants.code)}
        >
          <article className={articleClass}>
            {children}
            <NotFound />
          </article>
        </div>
      </Template>
    </PageGrid>
  );
};

Landing.displayName = 'Landing';
