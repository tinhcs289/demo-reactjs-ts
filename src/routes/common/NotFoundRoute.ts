import paths from '@/constants/paths';
import wait from '@/functions/wait';
import type { RouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const NotFoundPage = lazy(() => wait().then(() => import('@/pages/NotFoundPage')));

const NotFoundRoute: RouteConfig[] = [
  {
    name: 'NotFoundRoute',
    path: paths.notfound,
    component: NotFoundPage,
  },
];
export default NotFoundRoute;
