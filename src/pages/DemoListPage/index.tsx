import wait from '@/functions/wait';
import { lazy } from 'react';
const DashboardTabsContainer = lazy(() => wait(0).then(() => import('@/containers/DashboardTabsContainer')));
const ShopeeProductList = lazy(() => wait(0).then(() => import('@/modules/ShopeeProductList')));
export default function DemoListPage() {
  return (
    <DashboardTabsContainer>
      <ShopeeProductList />
    </DashboardTabsContainer>
  );
}
