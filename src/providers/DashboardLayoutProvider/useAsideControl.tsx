import usePrevious from '@/hooks/usePrevious';
import useToggle from '@/hooks/useToggle';
import asideMenuItems from '@/layouts/DashboardLayout/asideMenuItems';
import { TAsideMenuItem } from '@/layouts/DashboardLayout/_types';
import isEqual from 'lodash/isEqual';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useAsideControl = () => {
  const location = useLocation();

  const prePathname = usePrevious((location?.pathname || '').split(/[?#]/)[0]);

  const isMatchPath = useCallback(
    (url?: string, isExact?: boolean) => {
      if (!url || !location?.pathname) return false;

      const current = location?.pathname.split(/[?#]/)[0];
      if (!current) return false;
      if (current === url) return true;
      if (isExact && current.indexOf(url) > -1) return true;
      return false;
    },
    [location?.pathname],
  );

  const [isAsideOpen, toggleAside] = useToggle(true);

  const [urlOfInteractMenuItem, setUrlOfInteractMenuItem] = useState<string | null>(
    (() => {
      if (!location?.pathname) return null;
      return location?.pathname.split(/[?#]/)[0];
    })(),
  );

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
    [isMatchPath],
  );

  const [menuItems, setAsideMenuItems] = useState<TAsideMenuItem[]>(initMenuItems({ items: asideMenuItems }).items);

  const setInteractMenuItem = (interactUrl?: string) => {
    const items = initMenuItems({ items: asideMenuItems, interactUrl }).items;
    setAsideMenuItems(items);
    setUrlOfInteractMenuItem(interactUrl || null);
  };

  const getPageTitle = useCallback(() => {
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

    return title;
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

      if (!isEqual(_state.items, menuItems)) setAsideMenuItems(_state.items);
      if (_state.interactUrl !== urlOfInteractMenuItem) setInteractMenuItem(_state.interactUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname]);

  return {
    //#region open/hide
    isAsideOpen,
    toggleAside,
    //#endregion
    //#region pageTitle
    getPageTitle,
    //#endregion
    //#region menu items
    menuItems,
    //#endregion
    //#region toggle sub menu
    urlOfInteractMenuItem,
    setInteractMenuItem,
    //#endregion
  };
};
export default useAsideControl;
