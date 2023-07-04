import type { SxProps, Theme } from '@mui/material';
import type { CommonTextFieldVariant } from './_types';
export const DEFAULT_VARIANT: CommonTextFieldVariant = 'bootstrap'; // 'bootstrap' | 'filled' | 'outlined' | 'standard';
export const bootstrapVariantSx: SxProps<Theme> = {
  '& > label': {
    left: '-12px',
  },
  '& div.MuiInputBase-root': {
    marginTop: (t) => t.spacing(1.5),
    '& fieldset': {
      top: 0,
      '& legend': {
        display: 'none',
      },
    },
  },
};
