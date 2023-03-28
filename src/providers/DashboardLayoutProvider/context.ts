import contentMaxWidth from '@/appLocalStorages/contentMaxWidth';
import asideMenuItems from '@/constants/asideMenuItems';
import createFastContext from '@/functions/createFastContext';
import type { LayoutContextValues } from './_types';
const { Provider, useStore: useDashboardLayout } = createFastContext<LayoutContextValues>({
  isAsideOpen: true,
  urlOfInteractMenuItem: null,
  menuItems: asideMenuItems,
  pageTitle: null,
  pageMaxWidth: contentMaxWidth.get() || 'lg',
});
export { Provider, useDashboardLayout };

