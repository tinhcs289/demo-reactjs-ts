import paths from '@/routes/paths';
import wait from '@/routes/wait';
import type { TRouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const NotFoundPage = lazy(() => wait().then(() => import('@/pages/NotFoundPage')));

const NotFoundRoute: TRouteConfig[] = [
  {
    name: 'NotFoundRoute',
    path: paths.notfound,
    component: NotFoundPage,
  },
];
export default NotFoundRoute;
