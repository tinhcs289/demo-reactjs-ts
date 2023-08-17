import contentMaxWidth from '@/browser/localStorage/contentMaxWidth';
import asideMenuItems from '@/constants/asideMenuItems';
import createFastContext from '@/helpers/contextHelpers/createFastContext';
import type { LayoutContextValues } from './_types';
const { Provider, useStore: useDashboardLayout } = createFastContext<LayoutContextValues>({
  isAsideOpen: true,
  urlOfInteractMenuItem: null,
  menuItems: asideMenuItems,
  rootBreadcrumb: [],
  pageTitle: null,
  pageMaxWidth: contentMaxWidth.get() || 'lg',
});
export { Provider, useDashboardLayout };
