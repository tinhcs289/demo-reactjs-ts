import type { FC, ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react';
import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { ListItemTextProps } from '@mui/material/ListItemText';
import type { ListItemIconProps } from '@mui/material/ListItemIcon';
import type { ListItemProps } from '@mui/material/ListItem';
import type { NavLinkProps } from 'react-router-dom';

type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  muiName: string;
};

type SvgImage = FC<SvgIconProps<SvgIconTypeMap['defaultComponent'], {}>>;

type TAsideMenuItemType = 'link' | 'label';

export type LinkProps = Omit<
  ForwardRefExoticComponent<NavLinkProps & RefAttributes<HTMLAnchorElement>>,
  'to' | 'href'
>;

export type TAsideMenuItem = {
  // logic props
  id: string;
  type: TAsideMenuItemType;
  label?: ReactNode;
  labelText?: string;
  url?: string;
  childs?: TAsideMenuItem[];
  active?: boolean;
  openSubMenu?: boolean;
  // mui props
  icon?: MuiIcon | SvgImage | ReactNode;
  iconWrapProps?: ListItemIconProps;
  iconProps?: SvgIconProps<SvgIconTypeMap['defaultComponent'], {}>;
  itemProps?: Omit<ListItemProps, 'href'>;
  labelProps?: ListItemTextProps;
  linkProps?: LinkProps;
};

export type AsideMenuItemProps = {
  data: TAsideMenuItem;
  children?: ReactNode;
  active?: boolean;
  childActive?: boolean;
  open?: boolean;
  depth: number;
};

export type DashboardProps = { children?: ReactNode };
