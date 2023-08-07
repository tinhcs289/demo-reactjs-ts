import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
const DashboardTabsContainer = lazy(() => wait().then(() => import('@/containers/DashboardTabsContainer')));
const ShopeeProductList = lazy(() => wait().then(() => import('@/modules/ShopeeProductList')));
export default function DemoListPage() {
  return (
    <DashboardTabsContainer>
      <ShopeeProductList />
    </DashboardTabsContainer>
  );
}
