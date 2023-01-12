import paths from '@/routes/paths';
import wait from '@/functions/wait';
import type { TRouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const ShopeePage = lazy(() => wait().then(() => import('@/pages/ShopeePage')));

const ShopeeRoute: TRouteConfig[] = [
    {
        name: 'ShopeeRoute',
        path: paths.shopee,
        component: ShopeePage,
    },
];
export default ShopeeRoute;
