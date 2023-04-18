import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { FC, ReactNode } from 'react';
export type MuiBreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Icon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  muiName: string;
};
type SvgImage = FC<SvgIconProps<SvgIconTypeMap['defaultComponent'], {}>>;
export type MuiIcon = Icon | SvgImage | ReactNode;
export type MuiIconProps = SvgIconProps<SvgIconTypeMap['defaultComponent'], {}>;
