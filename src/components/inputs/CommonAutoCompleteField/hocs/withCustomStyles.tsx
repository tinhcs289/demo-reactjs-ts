import { styled, Theme } from '@mui/material';
import React from 'react';
import { TCommonAutoCompleteFieldProps } from '../types';

const withCustomStyles = (WrappedComponent: React.FC<TCommonAutoCompleteFieldProps>) => {
  return styled(WrappedComponent)<TCommonAutoCompleteFieldProps>((args: { theme: Theme }) => {
    const { theme } = args;
    return {
      //TODO: jss here
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
