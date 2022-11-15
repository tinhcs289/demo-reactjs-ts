import React from 'react';
import { TextFieldProps } from '@mui/material/TextField';

export type TCommonTextFieldProps = {
  errorText?: React.ReactNode;
} & TextFieldProps;
