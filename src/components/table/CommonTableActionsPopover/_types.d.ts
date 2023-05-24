import type { AnyObject, MuiIcon, MuiIconProps, NavLinkProps } from '@/types';
import type { ListItemIconProps } from '@mui/material/ListItemIcon';
import type { MenuProps } from '@mui/material/Menu/Menu';
import type { MenuItemProps } from '@mui/material/MenuItem';
import type { ComponentType, MouseEvent, ReactNode } from 'react';
export type ItemMenuActionRenderArgs<RowData extends AnyObject, OtherProps extends AnyObject> = {
  key: string | number;
  row?: RowData;
  icon: () => ReactNode;
  label: () => ReactNode;
  props: Omit<MenuProps, 'children'>;
} & OtherProps;
export type ItemMenuActionComponent<RowData extends AnyObject, OtherProps extends AnyObject = AnyObject> = ComponentType<
  ItemMenuActionRenderArgs<RowData, OtherProps>
>;
export type ItemMenuActionRenderFunction<RowData extends AnyObject, ComponentOtherProps extends AnyObject> = (
  args: ItemMenuActionRenderArgs<RowData, ComponentOtherProps>
) => ReactNode;
export type ItemMenuActionConfig<RowData extends AnyObject> = {
  /**
   * a unique GUID string
   */
  key: string;
  /**
   * the label
   */
  label?: ReactNode;
  /**
   * callback to handle click on item
   */
  onClick?: (item?: RowData, event?: MouseEvent<HTMLAnchorElement>, ...others: any[]) => void;
  /**
   * the `to` props.
   * if this props are defined, the item will rendered as a `NavLink` component
   */
  to?: string;
  /**
   * the other props of `NavLink` component and
   * only work inscase the `to` props are defined
   */
  linkProps?: NavLinkProps;
  /**
   * the icon component, use component import from `@mui/icons-material` or `SvgIcon`
   * or some google font like `<span class="material-symbols-rounded">arrow_back</span>` which can find at `https://fonts.google.com/icons`
   * It will be rendered as `MenuItem > ListItemIcon > icon`
   */
  icon?: MuiIcon;
  /**
   * the props of the icon component
   */
  iconProps?: MuiIconProps;
  /**
   * the props of the `MenuItem > ListItemIcon` component
   * only work inscase the `icon` props are defined
   */
  iconWrapProps?: ListItemIconProps;
  /**
   * the props of the `MenuItem` component
   */
  props?: Omit<MenuItemProps, 'children'>;
  /**
   * hide or display
   */
  isHide?: boolean;
  type: 'item' | 'divider';
  /**
   * custom render of the `MenuItem` component
   */
  render?: ItemMenuActionRenderFunction<RowData, AnyObject> | ItemMenuActionComponent<RowData, AnyObject>;
};
export type CommonTableActionsPopoverProps<RowData extends AnyObject> = MenuProps & {
  actions?: ItemMenuActionConfig<RowData>[];
  dataItem?: RowData;
};