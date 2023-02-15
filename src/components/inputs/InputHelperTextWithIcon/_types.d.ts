import type { SvgIconTypeMap } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';
import type { OverridableComponent } from '@mui/types';
import type { HTMLAttributes, ReactNode } from 'react';

export type InputHelperTextWithIconProps = {
  children?: ReactNode;
  textProps?: TypographyProps;
  icon?:
    | ReactNode
    | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
      });
} & HTMLAttributes<HTMLDivElement>;
