import paths from '@/routes/paths';
import type { TRouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const InDevelopPage = lazy(() => import('@/pages/InDevelopPage'));

const InDevelopRoute: TRouteConfig[] = [
  {
    name: 'DashboardRoute',
    path: paths.inDevelop,
    component: InDevelopPage,
  },
];
export default InDevelopRoute;
