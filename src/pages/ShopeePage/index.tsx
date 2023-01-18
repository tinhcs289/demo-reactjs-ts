import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { FC } from 'react';
import { lazy, Suspense } from 'react';

const ShopeeProductList = lazy(() => import('@/modules/ShopeeProductList'));
const ItemElementSetsProvider = lazy(() => import('./context/ItemElementSetsProvider'));
const PromoBrandsProvider = lazy(() => import('./context/PromoBrandsProvider'));
const CategoriesProvider = lazy(() => import('./context/CategoriesProvider'));
const BannerSlider = lazy(() => import('./components/BannerSlider'));
const QuickTools = lazy(() => import('./components/QuickTools'));
const PromoBrandList = lazy(() => import('./components/PromoBrandList'));
const CategoryList = lazy(() => import('./components/CategoryList'));
const BottomNavigator = lazy(() => import('./components/BottomNavigator'));
const PageContent = lazy(() => import('./components/PageContent'));
const PageTopBar = lazy(() => import('./components/PageTopBar'));

const Fallback = styled(Box)<BoxProps>(({ theme }) => ({
  height: theme.spacing(20),
  background: theme.palette.action.hover,
}));

const ProductListFallback = styled(Box)<BoxProps>(({ theme }) => ({
  height: theme.spacing(100),
  background: theme.palette.action.hover,
}));

const ShopeePage: FC<any> = () => {
  return (
    <>
      <PageTopBar />
      <Suspense fallback={<Fallback />}>
        <BannerSlider />
      </Suspense>
      <Suspense fallback={<Fallback />}>
        <QuickTools />
      </Suspense>
      <Suspense fallback={<Fallback />}>
        <PromoBrandsProvider>
          <PromoBrandList />
        </PromoBrandsProvider>
      </Suspense>
      <Suspense fallback={<Fallback />}>
        <CategoriesProvider>
          <CategoryList />
        </CategoriesProvider>
      </Suspense>
      <Suspense fallback={<ProductListFallback />}>
        <PageContent component="main">
          <ItemElementSetsProvider>
            <ShopeeProductList />
          </ItemElementSetsProvider>
        </PageContent>
      </Suspense>
      <Suspense fallback={<Fallback />}>
        <BottomNavigator />
      </Suspense>
    </>
  );
};
export default ShopeePage;
