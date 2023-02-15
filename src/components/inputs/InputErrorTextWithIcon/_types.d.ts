import type { TypographyProps } from '@mui/material/Typography';
import type { HTMLAttributes, ReactNode } from 'react';

export type InputErrorTextWithIconProps = {
  children?: ReactNode;
  textProps?: TypographyProps;
} & HTMLAttributes<HTMLDivElement>;
