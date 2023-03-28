import wait from '@/functions/wait';
import paths from '@/constants/paths';
import type { RouteConfig } from '@/routes/_types';
import { lazy } from 'react';
const ShopeePage = lazy(() => wait().then(() => import('@/pages/ShopeePage')));
const ShopeeProductDetailPage = lazy(() => wait().then(() => import('@/pages/ShopeeProductDetailPage')));
const ShopeeRoute: RouteConfig[] = [
  {
    name: 'ShopeeRoute',
    path: paths.shopee,
    component: ShopeePage,
  },
  {
    name: 'ShopeeProductDetailRoute',
    path: paths.shopeeProductDetail,
    component: ShopeeProductDetailPage,
  },
];
export default ShopeeRoute;
