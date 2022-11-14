import { lazy } from 'react';
import paths from '@/routes/paths';
import { TRouteConfig } from '@/routes/types';

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const NotFoundRoute: TRouteConfig[] = [
  {
    name: 'NotFoundRoute',
    path: paths.notfound,
    component: NotFoundPage,
  },
];
export default NotFoundRoute;
