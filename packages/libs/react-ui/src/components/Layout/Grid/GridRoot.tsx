import type { Sprinkles } from '@theme/sprinkles.css';
import { sprinkles } from '@theme/sprinkles.css';
import classNames from 'classnames';
import type { FC, ReactNode } from 'react';
import React from 'react';
import type { ResponsiveInputType } from './Grid.css';
import {
  containerColumnVariants,
  gapVariants,
  gridContainerClass,
} from './Grid.css';

export interface IGridRootProps
  extends Pick<
    Sprinkles,
    | 'height'
    | 'margin'
    | 'marginBottom'
    | 'marginLeft'
    | 'marginRight'
    | 'marginTop'
    | 'marginX'
    | 'marginY'
    | 'maxHeight'
    | 'maxWidth'
    | 'minHeight'
    | 'minWidth'
    | 'padding'
    | 'paddingBottom'
    | 'paddingLeft'
    | 'paddingRight'
    | 'paddingTop'
    | 'paddingX'
    | 'paddingY'
    | 'width'
  > {
  className?: string;
  children?: ReactNode;
  columns?: ResponsiveInputType;
  gap?: keyof typeof gapVariants;
}

const assembleColumnVariants = (
  columns: ResponsiveInputType,
): string | string[] => {
  if (typeof columns === 'number') {
    return containerColumnVariants.xs[columns];
  }

  return Object.entries(columns).map(([key, value]) => {
    return containerColumnVariants[key as keyof typeof containerColumnVariants][
      value
    ];
  });
};

export const GridRoot: FC<IGridRootProps> = ({
  className,
  children,
  columns,
  gap = '$md',
  height,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingX,
  paddingY,
  width,
}) => {
  const classList = classNames(
    gapVariants[gap],
    gridContainerClass,
    columns && assembleColumnVariants(columns),
    sprinkles({
      height,
      margin,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      marginX,
      marginY,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      padding,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingX,
      paddingY,
      width,
    }),
    className,
  );
  return <div className={classList}>{children}</div>;
};