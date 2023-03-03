import type { TNavLinkProps } from '@/types/TNavLinkProps';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { ComponentType, ReactNode } from 'react';

type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
type SvgImage = ComponentType<SvgIconProps<SvgIconTypeMap['defaultComponent'], {}>>;
export type TSiteMapItemIcon = MuiIcon | SvgImage | ReactNode;
export type TSiteMapItemIconProps = SvgIconProps<SvgIconTypeMap['defaultComponent'], {}>;
export type TSiteMapItem = {
  id: string;
  label?: ReactNode;
  labelText?: string;
  url?: string;
  icon?: TSiteMapItemIcon;
  iconProps?: TSiteMapItemIconProps;
  linkProps?: TNavLinkProps;
  childs?: TSiteMapItem[];
  [x: string]: any,
};
