import wait from '@/functions/wait';
import { lazy } from 'react';
const DashboardTabsContainer = lazy(() => wait(0).then(() => import('@/containers/DashboardTabsContainer')));
const ShopeeTopBanner = lazy(() => wait(0).then(() => import('@/modules/ShopeeTopBanner')));
const ShopeeQuickTools = lazy(() => wait(0).then(() => import('@/modules/ShopeeQuickTools')));
const ShopeeCategoryList = lazy(() => wait(0).then(() => import('@/modules/ShopeeCategoryList')));
const ShopeePromoBrandSlider = lazy(() => wait(0).then(() => import('@/modules/ShopeePromoBrandSlider')));

export default function DemoCarouselPage() {
  return (
    <DashboardTabsContainer>
      <ShopeeTopBanner />
      <ShopeeQuickTools />
      <ShopeePromoBrandSlider />
      <ShopeeCategoryList />
    </DashboardTabsContainer>
  );
}
