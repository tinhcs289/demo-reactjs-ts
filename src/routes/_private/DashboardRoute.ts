import paths from '@/routes/paths';
import wait from '@/functions/wait';
import type { TRouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const DashboardPage = lazy(() => wait().then(() => import('@/pages/DashboardPage')));
const InDevelopPage = lazy(() => wait().then(() => import('@/pages/InDevelopPage')));

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
