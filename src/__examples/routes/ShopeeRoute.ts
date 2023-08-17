import wait from '@/helpers/asyncHelpers/wait';
import paths from '@/__examples/constants/paths';
import type { RouteConfig } from '@/routes/_types';
import { lazy } from 'react';
const ShopeePage = lazy(() => wait().then(() => import('@/__examples/pages/ShopeePage')));
const ShopeeProductDetailPage = lazy(() =>
  wait().then(() => import('@/__examples/pages/ShopeeProductDetailPage'))
);
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
