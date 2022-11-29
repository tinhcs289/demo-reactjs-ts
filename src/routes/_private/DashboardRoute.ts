import paths from '@/routes/paths';
import type { TRouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const InDevelopPage = lazy(() => import('@/pages/InDevelopPage'));

const DashboardRoute: TRouteConfig[] = [
  {
    name: 'RandomRoute1',
    path: paths.ramdom1,
    component: InDevelopPage,
  },
  {
    name: 'RandomRoute2',
    path: paths.ramdom2,
    component: InDevelopPage,
  },
  {
    name: 'DashboardRoute1',
    path: paths.dashboard1,
    component: InDevelopPage,
  },
  {
    name: 'DashboardRoute2',
    path: paths.dashboard2,
    component: InDevelopPage,
  },
  {
    name: 'DashboardRoute3',
    path: paths.dashboard3,
    component: InDevelopPage,
  },
  {
    name: 'DashboardRoute',
    path: paths.dashboard,
    component: DashboardPage,
  },
];
export default DashboardRoute;
