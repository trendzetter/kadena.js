import { tokens, vars } from '@kadena/kode-ui/styles';
import { style } from '@vanilla-extract/css';

export const footerClass = style({
  paddingBlockStart: '10px',
});

export const breakAllClass = style({
  wordBreak: 'break-all',
});

export const cardClass = style({
  padding: '10px',
  border: `1px solid ${vars.colors.$layoutSurfaceCard}`,
  borderRadius: '5px',
});

export const codeClass = style({
  padding: '10px',
  borderRadius: '3px',
  backgroundColor: tokens.kda.foundation.color.neutral.n10,
  flex: '1',
  flexBasis: 0,
});

export const labelClass = style({
  maxWidth: '200px',
  flex: '1',
});

export const labelBoldClass = style({
  fontWeight: '700',
  color: tokens.kda.foundation.color.text.base.default,
});

export const containerClass = style({
  padding: '30px',
  border: `1px solid ${vars.colors.$layoutSurfaceCard}`,
  borderRadius: '5px',
  backgroundColor: tokens.kda.foundation.color.neutral.n1,
});

export const signedClass = style({
  background: vars.colors.$positiveContrast,
  padding: '2px 5px',
  borderRadius: '3px',
  fontWeight: 'bold',
});

export const readyToSignClass = style({
  background: vars.colors.$primaryLowContrast,
  padding: '2px 5px',
  borderRadius: '3px',
  fontWeight: 'bold',
});

export const tagClass = style({
  background: vars.colors.$layoutSurfaceCard,
  padding: '2px 5px',
  borderRadius: '3px',
  fontWeight: 'bold',
});

export const pendingClass = style({
  color: vars.colors.$warningHighContrast,
});

export const successClass = style({
  color: vars.colors.$positiveSurface,
});

export const failureClass = style({
  color: vars.colors.$negativeAccent,
});

export const pendingText = style({
  opacity: 0.5,
});

export const textEllipsis = style({
  overflow: 'hidden',
  minHeight: '2.2em',
  // overflowY: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const tabTextClass = style({
  width: '50px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const tabClass = style({
  borderBottom: `0px solid ${vars.colors.$infoContrast}`,
  selectors: {
    '&.selected': {
      borderWidth: '2px',
    },
  },
});

export const txTileClass = style({
  width: '250px',
  height: '260px',
  padding: '10px',
  border: `1px solid ${vars.colors.$borderDefault}`,
  borderRadius: '5px',
  overflow: 'hidden',
});

export const txTileContentClass = style({
  flexBasis: 0,
});
