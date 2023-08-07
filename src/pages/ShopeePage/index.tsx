import wait from '@/helpers/asyncHelpers/wait';
import { lazy, Suspense } from 'react';
import FallbackContentBlock from './components/FallbackContentBlock';
import FallbackProductList from './components/FallbackProductList';
const BottomNavigator = lazy(() => wait().then(() => import('./components/BottomNavigator')));
const ProductListContainer = lazy(() => wait().then(() => import('./components/ProductListContainer')));
const ShopeePageTopBar = lazy(() => wait().then(() => import('@/modules/ShopeePageTopBar')));
const ShopeeTopBanner = lazy(() => wait().then(() => import('@/modules/ShopeeTopBanner')));
const ShopeeQuickTools = lazy(() => wait().then(() => import('@/modules/ShopeeQuickTools')));
const ShopeeCategoryList = lazy(() => wait().then(() => import('@/modules/ShopeeCategoryList')));
const ShopeePromoBrandSlider = lazy(() => wait().then(() => import('@/modules/ShopeePromoBrandSlider')));
const ShopeeProductList = lazy(() => wait().then(() => import('@/modules/ShopeeProductList')));
export default function ShopeePage() {
  return (
    <>
      <ShopeePageTopBar />
      <Suspense fallback={<FallbackContentBlock />}>
        <ShopeeTopBanner />
      </Suspense>
      <Suspense fallback={<FallbackContentBlock />}>
        <ShopeeQuickTools />
      </Suspense>
      <Suspense fallback={<FallbackContentBlock />}>
        <ShopeePromoBrandSlider />
      </Suspense>
      <Suspense fallback={<FallbackContentBlock />}>
        <ShopeeCategoryList />
      </Suspense>
      <Suspense fallback={<FallbackProductList />}>
        <ProductListContainer>
          <ShopeeProductList />
        </ProductListContainer>
      </Suspense>
      <Suspense fallback={<FallbackContentBlock />}>
        <BottomNavigator />
      </Suspense>
    </>
  );
}
