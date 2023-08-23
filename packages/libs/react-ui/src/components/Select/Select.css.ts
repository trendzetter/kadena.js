import { vars } from '../../styles';

import { sprinkles } from '@theme/sprinkles.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const containerClass = style([
  sprinkles({
    borderRadius: '$sm',
    paddingRight: '$4',
    backgroundColor: {
      lightMode: '$white',
      darkMode: '$gray100',
    },
    color: {
      lightMode: '$gray60',
      darkMode: '$gray40',
    },
    borderColor: {
      lightMode: '$white',
      darkMode: '$gray60',
    },
  }),
  {
    position: 'relative',
  },
]);

export const containerClassDisabled = style([
  sprinkles({
    backgroundColor: {
      lightMode: '$gray30',
      // darkMode: '$gray100',
    },
    color: {
      lightMode: '$gray100',
      // darkMode: '$gray40',
    },
  }),
]);

export const selectVariants = styleVariants({
  default: [
    {
      borderBottom: `1px solid ${vars.colors.$gray30}`,
    },
  ],
  solid: [
    {
      border: `1px solid ${vars.colors.$gray30}`,
    },
  ],
});

export const selectContainerClass = style([
  sprinkles({
    display: 'flex',
  }),
]);

export const iconClass = style([
  sprinkles({
    marginRight: '$2',
    marginLeft: '$2',
    display: 'flex',
    alignItems: 'center',
  }),
]);

export const selectClass = style([
  sprinkles({
    padding: '$2',
    border: 'none',
    fontSize: '$base',
  }),
  {
    backgroundColor: 'inherit',
    color: 'inherit',
    flex: '1',
  },
]);
