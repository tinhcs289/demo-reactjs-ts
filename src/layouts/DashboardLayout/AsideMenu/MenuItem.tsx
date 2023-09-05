import stringOrEmpty from '@/helpers/formatHelpers/stringOrEmpty';
import render from '@/helpers/reactHelpers/render';
import { useDashboardLayoutSetState, useDashboardLayoutState } from '@/providers/DashboardLayoutProvider';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme, useMediaQuery, Theme } from '@mui/material';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { MouseEventHandler } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import type { AsideMenuItemProps } from '../_types';
function ToggleButton(props: IconButtonProps & { open?: boolean }) {
  const { open, ...otherProps } = props;
  return (
    <IconButton {...otherProps} edge="end">
      {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </IconButton>
  );
}
function MenuItem(props: AsideMenuItemProps) {
  const theme = useTheme();
  const { children } = props;
  const active = useMemo(() => !!props?.active, [props?.active]);
  const childActive = useMemo(() => !!props?.childActive, [props?.childActive]);
  const item = useMemo(() => props?.data || {}, [props?.data]);
  const depth = useMemo(() => {
    return typeof props?.depth === 'number' && !Number.isNaN(props?.depth) ? props.depth : 0;
  }, [props?.depth]);

  const setLayoutState = useDashboardLayoutSetState();
  const isAsideOpen = useDashboardLayoutState((s) => s.isAsideOpen);
  const urlOfInteractMenuItem = useDashboardLayoutState((s) => s.urlOfInteractMenuItem);
  const memoUrl = useMemo(() => {
    return stringOrEmpty(urlOfInteractMenuItem);
  }, [urlOfInteractMenuItem]);

  const listItemProps = useMemo(() => {
    return {
      selected: !!active || !!childActive,
      ...(depth > 0 && isAsideOpen ? { sx: { pl: theme.spacing(depth * 4) } } : {}),
    };
  }, [theme, active, depth, isAsideOpen, childActive]);

  const handleToggleSubMenu: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      event?.preventDefault?.();
      if (!item?.url) return;

      if (item.url === memoUrl) {
        setLayoutState({ urlOfInteractMenuItem: null });
        return;
      }

      setLayoutState({ urlOfInteractMenuItem: item.url });
      return;
    },
    [item, memoUrl, setLayoutState]
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
  const isMediumScreenOrLower = useMediaQuery((t: Theme) => t?.breakpoints?.down?.('lg'));
  const handleClickItem = useCallback(() => {
    if (!isMediumScreenOrLower) return;
    if (!isAsideOpen) return;
    setLayoutState({ isAsideOpen: false });
  }, [isMediumScreenOrLower, isAsideOpen, setLayoutState]);
  return (
    <>
      <NavLink {...linkProps} onClick={handleClickItem as any}>
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
            <ToggleButton open={isOpenSubMenu} onClick={handleToggleSubMenu} />
          ) : null}
        </ListItemButton>
      </NavLink>
      {children}
    </>
  );
}
export default memo(MenuItem);
