import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
const PageTabsContainer = lazy(() =>
  wait().then(() => import('@/__examples/containers/DemoPageTabsContainers'))
);
const ShopeeTopBanner = lazy(() => wait().then(() => import('@/__examples/modules/Shopee/ShopeeTopBanner')));
const ShopeeQuickTools = lazy(() =>
  wait().then(() => import('@/__examples/modules/Shopee/ShopeeQuickTools'))
);
const ShopeeCategoryList = lazy(() =>
  wait().then(() => import('@/__examples/modules/Shopee/ShopeeCategoryList'))
);
const ShopeePromoBrandSlider = lazy(() =>
  wait().then(() => import('@/__examples/modules/Shopee/ShopeePromoBrandSlider'))
);

export default function DemoCarouselPage() {
  return (
    <PageTabsContainer>
      <ShopeeTopBanner />
      <ShopeeQuickTools />
      <ShopeePromoBrandSlider />
      <ShopeeCategoryList />
    </PageTabsContainer>
  );
}
