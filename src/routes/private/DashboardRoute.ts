import PATHS from '@/constants/paths';
import wait from '@/helpers/asyncHelpers/wait';
import type { RouteConfig } from '@/routes/_types';
import { lazy } from 'react';
const Content404 = lazy(() => wait().then(() => import('@/modules/Content404')));
const DemoFormPage = lazy(() => wait().then(() => import('@/pages/DemoFormPage')));
const DemoTablePage = lazy(() => wait().then(() => import('@/pages/DemoTablePage')));
const DemoListPage = lazy(() => wait().then(() => import('@/pages/DemoListPage')));
const DemoCarouselPage = lazy(() => wait().then(() => import('@/pages/DemoCarouselPage')));
const DemoGoogleMapPage = lazy(() => wait().then(() => import('@/pages/DemoGoogleMapPage')));
const DashboardRoute: RouteConfig[] = [
  {
    name: 'DemoFormRoute',
    path: PATHS.demoForm,
    component: DemoFormPage,
  },
  {
    name: 'DemoTableRoute',
    path: PATHS.demoTable,
    component: DemoTablePage,
  },
  {
    name: 'DemoListRoute',
    path: PATHS.demoDataGrid,
    component: DemoListPage,
  },
  {
    name: 'DemoCarouselRoute',
    path: PATHS.demoCarousel,
    component: DemoCarouselPage,
  },
  {
    name: 'DemoGoogleMapRoute',
    path: PATHS.demoGoogleMap,
    component: DemoGoogleMapPage,
  },
  {
    name: 'DashboardRoute',
    path: PATHS.dashboard,
    navigateTo: PATHS.demoForm,
  },
  {
    name: 'DashboardNotFoundRoute',
    path: PATHS.dashboard + '/*',
    component: Content404,
  },
];
export default DashboardRoute;
