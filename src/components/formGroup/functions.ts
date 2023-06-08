import type { Theme } from '@mui/material';
export function optionBackground(theme: Theme) {
  return {
    borderRadius: theme.spacing(0.5),
    background:
      theme.palette.mode === 'light' ? theme.palette.action.hover : theme.palette.background.default,
    '&:hover': {
      background: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
    },
  };
}
export function inputLabelStyles(theme?: Theme) {
  return {
    fontWeight: '400',
    fontSize: '1rem',
    lineHeight: '1.4375em',
    letterSpacing: '0.00938em',
    transform: 'translate(-48px, 0px) scale(0.75)',
  };
}