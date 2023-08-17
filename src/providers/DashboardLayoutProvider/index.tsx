import contentMaxWidth from '@/browser/localStorage/contentMaxWidth';
import asideMenuItems from '@/constants/asideMenuItems';
import createFastContext from '@/helpers/contextHelpers/createFastContext';
import { useCallback } from 'react';
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
  rootBreadcrumb: [],
  pageTitle: null,
  pageMaxWidth: contentMaxWidth.get() || 'lg',
});
export { useDashboardLayout, useDashboardLayoutState, useDashboardLayoutSetState };
export default function DashboardLayoutProvider(props: { children?: ReactNode }) {
  const { children } = props;
  return <Provider>{children}</Provider>;
}
export function useDashboardBreadcrumb() {
  const [breadcrumb, setStore] = useDashboardLayout((s) => s?.rootBreadcrumb);
  type BreadcrumbItems = Required<LayoutContextValues>['rootBreadcrumb'];
  const appendBreadcrumb = useCallback(
    (items?: BreadcrumbItems) => {
      if (!(items instanceof Array && items.length > 0)) return;
      const newItems = [...(breadcrumb || []), ...items];
      setTimeout(() => {
        setStore({ rootBreadcrumb: newItems });
      }, 0);
    },
    [breadcrumb, setStore]
  );
  return {
    appendBreadcrumb,
  };
}
