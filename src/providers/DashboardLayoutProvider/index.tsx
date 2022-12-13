import createFastContext from '@/functions/createFastContext';
import asideMenuItems from '@/constants/asideMenuItems';
import type { FC, ReactNode } from 'react';
import type { TLayoutContextValue } from './_types';

const { Provider, useStore: useDashboardLayout } = createFastContext<TLayoutContextValue>({
  isAsideOpen: true,
  urlOfInteractMenuItem: null,
  menuItems: asideMenuItems,
  pageTitle: null,
});

const DashboardLayoutProvider: FC<{ children?: ReactNode }> = (props) => {
  const { children } = props;
  return <Provider>{children}</Provider>;
};
export default DashboardLayoutProvider;
export { useDashboardLayout };
