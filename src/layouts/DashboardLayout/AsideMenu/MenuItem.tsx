import stringOrEmpty from '@/helpers/formatHelpers/stringOrEmpty';
import render from '@/helpers/reactHelpers/render';
import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { FC, MouseEvent } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import type { TMenuItemProps } from '../_types';

const ToggleButton: FC<IconButtonProps & { open?: boolean }> = (props) => {
  const { open, ...otherProps } = props;
  return (
    <IconButton {...otherProps} edge="end">
      {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </IconButton>
  );
};

const MenuItem: FC<TMenuItemProps> = (props) => {
  const theme = useTheme();

  const { children } = props;

  const item = useMemo(() => {
    return props?.data;
  }, [props?.data]);

  const active = useMemo(() => {
    return !!props?.active;
  }, [props?.active]);

  const childActive = useMemo(() => {
    return !!props?.childActive;
  }, [props?.childActive]);

  const depth = useMemo(() => {
    return typeof props?.depth === 'number' && !Number.isNaN(props?.depth) ? props.depth : 0;
  }, [props?.depth]);

  const [isAsideOpen] = useDashboardLayout((s) => s.isAsideOpen);
  const [urlOfInteractMenuItem, setInteractMenuItem] = useDashboardLayout((s) => s.urlOfInteractMenuItem);

  const memoUrl = useMemo(() => {
    return stringOrEmpty(urlOfInteractMenuItem);
  }, [urlOfInteractMenuItem]);

  const listItemProps = useMemo(() => {
    return {
      selected: !!active,
      ...(depth > 0 && isAsideOpen ? { sx: { pl: theme.spacing(depth * 4) } } : {}),
    };
  }, [theme, active, depth, isAsideOpen]);

  const handleToggleSubMenu = useCallback(
    (event: MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event?.stopPropagation?.();
      event?.preventDefault?.();
      if (!item?.url) return;

      if (item.url === memoUrl) {
        setInteractMenuItem({ urlOfInteractMenuItem: null });
        return;
      }

      setInteractMenuItem({ urlOfInteractMenuItem: item.url });
      return;
    },
    [item, memoUrl, setInteractMenuItem]
  );

  const linkProps = useMemo(() => {
    return {
      to: item.url || '',
      style: { textDecoration: 'none' },
      ...item.linkProps,
    };
  }, [item.url, item.linkProps]);

  const isOpenSubMenu = useMemo(() => {
    return item.url === memoUrl;
  }, [item, memoUrl]);

  const activeTextProps = useMemo(() => {
    return {
      ...(active || childActive
        ? {
            primaryTypographyProps: {
              sx: { fontWeight: theme.typography.fontWeightBold },
            },
          }
        : {}),
    };
  }, [theme, active, childActive]);

  const activeIconProps = useMemo(() => {
    return {
      ...(active || childActive ? { color: 'primary' } : {}),
    };
  }, [active, childActive]);

  return (
    <>
      <NavLink {...linkProps}>
        <ListItemButton {...listItemProps} disableTouchRipple disableRipple>
          {!item.icon ? null : (
            <ListItemIcon {...item.iconWrapProps}>
              {render(item.icon, { ...item.iconProps, ...activeIconProps })}
            </ListItemIcon>
          )}
          <ListItemText
            primary={item.label || ''}
            primaryTypographyProps={{ noWrap: true, title: item.labelText || '' }}
            {...activeTextProps}
            sx={{ color: theme.palette.text.primary }}
            {...item.labelProps}
          />
          {Array.isArray(item.childs) && item.childs.length > 0 ? (
            <ToggleButton open={isOpenSubMenu} onClick={handleToggleSubMenu as any} />
          ) : null}
        </ListItemButton>
      </NavLink>
      {children}
    </>
  );
};
export default memo(MenuItem) as FC<TMenuItemProps>;
