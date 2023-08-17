import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
const PageTabsContainer = lazy(() =>
  wait().then(() => import('@/__examples/containers/DemoPageTabsContainers'))
);
const ShopeeProductList = lazy(() =>
  wait().then(() => import('@/__examples/modules/Shopee/ShopeeProductList'))
);
export default function DemoListPage() {
  return (
    <PageTabsContainer>
      <ShopeeProductList />
    </PageTabsContainer>
  );
}
