import type { SvgIconTypeMap } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import type { OverridableComponent } from '@mui/types';
import React from 'react';

export type InputHelperTextWithIconProps = {
  children?: React.ReactNode;
  textProps?: TypographyProps;
  icon?:
    | React.ReactNode
    | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
      });
} & React.HTMLAttributes<HTMLDivElement>;
