import contentMaxWidth from '@/appLocalStorages/contentMaxWidth';
import asideMenuItems from '@/constants/asideMenuItems';
import createFastContext from '@/functions/createFastContext';
import type { ReactNode } from 'react';
import type { LayoutContextValues } from './_types';
const {
  Provider,
  useStore: useDashboardLayout,
  useGetter: useDashboardLayoutState,
  useSetter: useDashboardLayoutSetState,
} = createFastContext<LayoutContextValues>({
  isAsideOpen: true,
  urlOfInteractMenuItem: null,
  menuItems: asideMenuItems,
  pageTitle: null,
  pageMaxWidth: contentMaxWidth.get() || 'lg',
});
export { useDashboardLayout, useDashboardLayoutState, useDashboardLayoutSetState };
export default function DashboardLayoutProvider(props: { children?: ReactNode }) {
  const { children } = props;
  return <Provider>{children}</Provider>;
}
