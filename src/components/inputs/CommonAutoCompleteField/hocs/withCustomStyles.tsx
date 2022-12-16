import type { Theme } from '@mui/material';
import { styled } from '@mui/material';
import React from 'react';
import type { TCommonAutoCompleteFieldProps } from '../_types';

const withCustomStyles = (WrappedComponent: React.FC<TCommonAutoCompleteFieldProps>) => {
  return styled(WrappedComponent)<TCommonAutoCompleteFieldProps>((args: { theme: Theme }) => {
    const { theme } = args;
    return {
      '& .MuiFormControl-root': {
        '& .MuiInputBase-root.MuiInputBase-formControl.MuiAutocomplete-inputRoot': {
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: theme.shape.borderRadius,
          padding: `${theme.spacing(1, 1)} !important`,
          '&::before': {
            borderBottom: 'none !important',
          },
        },
      },
    };
  });
};
export default withCustomStyles;
