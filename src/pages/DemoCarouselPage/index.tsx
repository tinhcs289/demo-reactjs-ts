import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
const DashboardTabsContainer = lazy(() => wait().then(() => import('@/containers/DashboardTabsContainer')));
const ShopeeTopBanner = lazy(() => wait().then(() => import('@/modules/ShopeeTopBanner')));
const ShopeeQuickTools = lazy(() => wait().then(() => import('@/modules/ShopeeQuickTools')));
const ShopeeCategoryList = lazy(() => wait().then(() => import('@/modules/ShopeeCategoryList')));
const ShopeePromoBrandSlider = lazy(() => wait().then(() => import('@/modules/ShopeePromoBrandSlider')));

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
