import contentMaxWidth from '@/browser/localStorage/contentMaxWidth';
import asideMenuItems from '@/constants/asideMenuItems';
import usePrevious from '@/hooks/usePrevious';
import type { TAsideMenuItem } from '@/layouts/DashboardLayout';
import { useDashboardLayoutSetState, useDashboardLayoutState } from '@/providers/DashboardLayoutProvider';
import isEqual from 'lodash/isEqual';
import type { ReactNode } from 'react';
import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_WIDTH } from './constants';
export default function LayoutInit() {
  const location = useLocation();
  const prePathname = usePrevious((location?.pathname || '').split(/[?#]/)[0]);
  const setState = useDashboardLayoutSetState();
  const pageMaxWidth = useDashboardLayoutState((s) => s.pageMaxWidth);
  useEffect(() => {
    contentMaxWidth.onChange((event, detail) => {
      if (isEqual(detail.value, pageMaxWidth)) return;
      setState({ pageMaxWidth: detail.value || DEFAULT_WIDTH });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isMatchPath = useCallback(
    (url?: string, isExact?: boolean) => {
      if (!url || !location?.pathname) return false;

      const current = location?.pathname.split(/[?#]/)[0];
      if (!current) return false;
      if (current === url) return true;
      if (isExact && current.indexOf(url) > -1) return true;
      return false;
    },
    [location?.pathname]
  );
  const urlOfInteractMenuItem = useDashboardLayoutState((s) => s.urlOfInteractMenuItem);
  useEffect(() => {
    setState({
      urlOfInteractMenuItem: (() => {
        if (!location?.pathname) return null;
        return location?.pathname.split(/[?#]/)[0];
      })(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initMenuItems = useCallback(
    (args: {
      items: TAsideMenuItem[];
      interactUrl?: string;
      isFirstLoad?: boolean;
    }): { items: TAsideMenuItem[]; interactUrl?: string } => {
      const { items, interactUrl, isFirstLoad } = args;
      let _url: string | null = null;
      const _items = items.map((item) => {
        const openSubMenu = isFirstLoad
          ? item.url === interactUrl ||
            (Array.isArray(item.childs) && item.childs.findIndex((i) => isMatchPath(i.url)) >= 0)
          : item.url === interactUrl;

        if (openSubMenu && !!item.url) _url = item.url;

        return {
          ...item,
          active: isMatchPath(item.url),
          openSubMenu,
          childs: Array.isArray(item.childs)
            ? item.childs.map((child) => ({
                ...child,
                active: isMatchPath(child.url, true),
              }))
            : [],
        } as TAsideMenuItem;
      });
      return {
        items: _items,
        interactUrl: _url || undefined,
      };
    },
    [isMatchPath]
  );
  const menuItems = useDashboardLayoutState((s) => s.menuItems);
  useEffect(() => {
    const items = initMenuItems({ items: menuItems }).items;
    setState({ menuItems: items });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pageTitle = useDashboardLayoutState((s) => s.pageTitle);
  useEffect(() => {
    if (!urlOfInteractMenuItem) {
      const items = initMenuItems({ items: asideMenuItems }).items;
      setState({ menuItems: items });
    } else {
      const items = initMenuItems({ items: menuItems, interactUrl: urlOfInteractMenuItem }).items;
      setState({ menuItems: items });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlOfInteractMenuItem]);
  useEffect(() => {
    let title: ReactNode | null = null;
    try {
      menuItems.forEach((item) => {
        if (item.active) {
          title = item.label;
          throw new Error();
        }
        if (Array.isArray(item.childs)) {
          item.childs.forEach((child) => {
            if (child.active) {
              title = child.label;
              throw new Error();
            }
          });
        }
      });
    } catch (error) {}
    if (isEqual(title, pageTitle)) return;
    setState({ pageTitle: title });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuItems]);
  useEffect(() => {
    if (!location?.pathname) return;
    const newPath = location?.pathname.split(/[?#]/)[0];
    if (newPath !== prePathname) {
      const _state = initMenuItems({
        items: asideMenuItems,
        interactUrl: urlOfInteractMenuItem || undefined,
        isFirstLoad: true,
      });
      if (!isEqual(_state.items, menuItems)) setState({ menuItems: _state.items });
      if (_state.interactUrl !== urlOfInteractMenuItem)
        setState({ urlOfInteractMenuItem: _state.interactUrl });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname]);
  return <></>;
}
