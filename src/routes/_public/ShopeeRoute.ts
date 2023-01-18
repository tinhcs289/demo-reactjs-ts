import wait from '@/functions/wait';
import paths from '@/routes/paths';
import type { TRouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const ShopeePage = lazy(() => wait().then(() => import('@/pages/ShopeePage')));
const ShopeeProductDetailPage = lazy(() => wait().then(() => import('@/pages/ShopeeProductDetailPage')));

const ShopeeRoute: TRouteConfig[] = [
    {
        name: 'ShopeeRoute',
        path: paths.shopee,
        component: ShopeePage,
    },
    {
        name: 'shopeeProductDetailRoute',
        path: paths.shopeeProductDetail,
        component: ShopeeProductDetailPage,
    },

];
export default ShopeeRoute;
