import usePrevious from '@/hooks/usePrevious';
import useToggle from '@/hooks/useToggle';
import asideMenuItems from '@/layouts/DashboardLayout/asideMenuItems';
import { TAsideMenuItem } from '@/layouts/DashboardLayout/_types';
import isEqual from 'lodash/isEqual';
import type { FC, ReactNode } from 'react';
import { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { IDashboardLayoutContextValues } from './_types';

const DashboardLayoutContext = createContext({} as IDashboardLayoutContextValues);

export const useDashboardLayoutContext = () => {
  return useContext(DashboardLayoutContext);
};

const DashboardLayoutProvider: FC<{ children?: ReactNode }> = (props) => {
  const { children } = props;

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
    (items: TAsideMenuItem[], interactUrl?: string) => {
      const _items = items.map((item) => ({
        ...item,
        active: isMatchPath(item.url),
        openSubMenu:
          item.url === interactUrl ||
          (Array.isArray(item.childs) && item.childs.findIndex((i) => isMatchPath(i.url)) >= 0),
        childs: Array.isArray(item.childs)
          ? item.childs.map((child) => ({
              ...child,
              active: isMatchPath(child.url, true),
            }))
          : [],
      }));
      return _items;
    },
    [isMatchPath],
  );

  const [menuItems, setAsideMenuItems] = useState<TAsideMenuItem[]>(initMenuItems(asideMenuItems));

  const setInteractMenuItem = (interactUrl?: string) => {
    const items = initMenuItems(asideMenuItems, interactUrl);
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
      const items = initMenuItems(asideMenuItems, urlOfInteractMenuItem || undefined);

      if (!isEqual(items, menuItems)) setAsideMenuItems(items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname]);

  return (
    <DashboardLayoutContext.Provider
      value={
        {
          layoutState: {
            menuItems,
            isAsideOpen,
            urlOfInteractMenuItem,
            isMatchPath,
            getPageTitle,
          },
          layoutAction: {
            toggleAside,
            setInteractMenuItem,
          },
        } as IDashboardLayoutContextValues
      }
    >
      {children}
    </DashboardLayoutContext.Provider>
  );
};
export default DashboardLayoutProvider;
