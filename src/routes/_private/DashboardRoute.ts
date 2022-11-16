import paths from '@/routes/paths';
import { TRouteConfig } from '@/routes/types';
import { lazy } from 'react';

const DashboardPage = lazy(() => import('@/pages/DashboardPage'));

const DashboardRoute: TRouteConfig[] = [
  {
    name: 'DashboardRoute',
    path: paths.dashboard,
    component: DashboardPage,
  },
];
export default DashboardRoute;
