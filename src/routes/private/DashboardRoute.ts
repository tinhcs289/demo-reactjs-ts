import PATHS from '@/constants/paths';
import wait from '@/helpers/asyncHelpers/wait';
import type { RouteConfig } from '@/routes/_types';
import { lazy } from 'react';
const DashboardPage = lazy(() => wait().then(() => import('@/pages/DashboardPage')));
const Content404 = lazy(() => wait().then(() => import('@/modules/Content404')));
const DashboardRoute: RouteConfig[] = [
  {
    name: 'DashboardRoute',
    path: PATHS.dashboard,
    component: DashboardPage,
  },
  {
    name: 'DashboardNotFoundRoute',
    path: PATHS.dashboard + '/*',
    component: Content404,
  },
];
export default DashboardRoute;
