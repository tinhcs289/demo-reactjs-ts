import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { FC, ReactNode } from 'react';

type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  muiName: string;
};

type SvgImage = FC<SvgIconProps<SvgIconTypeMap['defaultComponent'], {}>>;

export type TMuiIcon = MuiIcon | SvgImage | ReactNode;
export type TMuiIconProps = SvgIconProps<SvgIconTypeMap['defaultComponent'], {}>;
