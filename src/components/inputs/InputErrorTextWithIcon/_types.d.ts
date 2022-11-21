import type { TypographyProps } from '@mui/material/Typography';
import React from 'react';

export type InputErrorTextWithIconProps = {
  children?: React.ReactNode;
  textProps?: TypographyProps;
} & React.HTMLAttributes<HTMLDivElement>;
