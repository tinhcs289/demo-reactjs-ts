import wait from '@/functions/wait';
import paths from '@/routes/paths';
import type { TRouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const DashboardPage = lazy(() => wait().then(() => import('@/pages/DashboardPage')));
const InDevelopPage = lazy(() => wait().then(() => import('@/pages/InDevelopPage')));
const DemoFormPage = lazy(() => wait().then(() => import('@/pages/DemoFormPage')));
const DemoTablePage = lazy(() => wait().then(() => import('@/pages/DemoTablePage')));
const DemoListPage = lazy(() => wait().then(() => import('@/pages/DemoListPage')));
const DemoCarouselPage = lazy(() => wait().then(() => import('@/pages/DemoCarouselPage')));

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
    component: DemoFormPage,
  },
  {
    name: 'DashboardRoute2',
    path: paths.dashboard2,
    component: DemoTablePage,
  },
  {
    name: 'DashboardRoute3',
    path: paths.dashboard3,
    component: DemoListPage,
  },
  {
    name: 'DashboardRoute4',
    path: paths.dashboard4,
    component: DemoCarouselPage,
  },
  {
    name: 'DashboardRoute',
    path: paths.dashboard,
    component: DashboardPage,
  },
];
export default DashboardRoute;
