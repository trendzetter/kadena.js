import { Sprinkles, sprinkles } from '../../styles';

import React, { createElement, ElementType } from 'react';

export interface IStackProps
  extends Pick<
    Sprinkles,
    | 'margin'
    | 'marginX'
    | 'marginY'
    | 'marginTop'
    | 'marginBottom'
    | 'marginLeft'
    | 'marginRight'
    | 'justifyContent'
    | 'alignItems'
  > {
  direction?: Sprinkles['flexDirection'];
  wrap?: Sprinkles['flexWrap'];
  spacing?: Sprinkles['gap'];
  component?: ElementType;
  children?: React.ReactNode;
}

export const Stack = ({
  component = 'div',
  margin = undefined,
  marginX = undefined,
  marginY = undefined,
  marginTop = undefined,
  marginBottom = undefined,
  marginLeft = undefined,
  marginRight = undefined,
  spacing = undefined,
  justifyContent = undefined,
  alignItems = undefined,
  wrap = undefined,
  direction = undefined,
  children,
}: IStackProps): React.ReactElement => {
  return createElement(
    component,
    {
      className: sprinkles({
        display: 'flex',
        margin,
        marginX,
        marginY,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        gap: spacing,
        justifyContent,
        alignItems,
        flexWrap: wrap,
        flexDirection: direction,
      }),
      'data-testid': 'kda-stack',
    },
    children,
  );
};
