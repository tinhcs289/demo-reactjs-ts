import render from '@/helpers/reactHelpers/render';
import type { AnyObject } from '@/types';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import type { MenuProps } from '@mui/material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import type { MouseEvent } from 'react';
import { useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import type { ItemMenuActionConfig } from '../_types';
export default function ItemActionMenu<RowData extends AnyObject>(
  props: MenuProps & {
    actions?: ItemMenuActionConfig<RowData>[];
    dataItem?: RowData;
  }
) {
  const { children, actions, dataItem, ...otherProps } = props;
  const memoAction = useMemo(() => {
    return Array.isArray(actions) ? actions.filter((a) => !a?.isHide) : [];
  }, [actions]);
  const memoItem = useMemo(() => {
    return dataItem;
  }, [dataItem]);
  const handleActionClick = useCallback(
    (action: ItemMenuActionConfig<RowData>) => {
      return (event: MouseEvent<HTMLAnchorElement>) => {
        event?.stopPropagation?.();
        event?.preventDefault?.();
        action?.onClick?.(memoItem, event);
      };
    },
    [memoItem]
  );
  const renderAction = useCallback(
    (action: ItemMenuActionConfig<RowData>) => {
      const renderIcon = () => {
        return !action?.icon ? null : (
          <ListItemIcon {...action?.iconWrapProps}>{render(action.icon, action?.iconProps)}</ListItemIcon>
        );
      };
      const renderLabel = () =>
        typeof action.label === 'string' ? (
          <Typography variant="inherit" noWrap>
            {action.label}
          </Typography>
        ) : (
          action?.label || null
        );
      if (!!action?.render) {
        return render(action.render, {
          key: action.key,
          row: memoItem,
          icon: renderIcon,
          label: renderLabel,
          props: action?.props as any,
        });
      }
      if (action?.type === 'divider') return <Divider key={action.key} />;
      if (!action?.label) return null;
      if (!!action?.to) {
        return (
          <NavLink
            key={action.key}
            to={action.to}
            {...action?.linkProps}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <MenuItem {...(action?.props as any)}>
              {renderIcon()}
              {renderLabel()}
            </MenuItem>
          </NavLink>
        );
      }
      return (
        <MenuItem key={action.key} {...(action?.props as any)} onClick={handleActionClick(action)}>
          {renderIcon()}
          {renderLabel()}
        </MenuItem>
      );
    },
    [handleActionClick, memoItem]
  );
  const actionsRendered = useMemo(() => {
    return memoAction.map((action) => renderAction(action));
  }, [memoAction, renderAction]);
  if (memoAction.length > 0) {
    return <Menu {...otherProps}>{actionsRendered}</Menu>;
  }
  if (!!children) return <Menu {...otherProps}>{children}</Menu>;
  return null;
}
