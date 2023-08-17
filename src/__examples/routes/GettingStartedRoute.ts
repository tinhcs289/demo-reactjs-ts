import PATHS from '@/__examples/constants/paths';
import wait from '@/helpers/asyncHelpers/wait';
import type { RouteConfig } from '@/routes/_types';
import { lazy } from 'react';
const Content404 = lazy(() => wait().then(() => import('@/modules/Content404')));
const DemoFormPage = lazy(() => wait().then(() => import('@/__examples/pages/DemoFormPage')));
const DemoTablePage = lazy(() => wait().then(() => import('@/__examples/pages/DemoTablePage')));
const DemoListPage = lazy(() => wait().then(() => import('@/__examples/pages/DemoListPage')));
const DemoCarouselPage = lazy(() => wait().then(() => import('@/__examples/pages/DemoCarouselPage')));
const DemoGoogleMapPage = lazy(() => wait().then(() => import('@/__examples/pages/DemoGoogleMapPage')));
const GettingStartedRoute: RouteConfig[] = [
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
    name: 'GettingStartedRoute',
    path: PATHS.componentDocs,
    navigateTo: PATHS.demoTable,
  },
  {
    name: 'GettingStartedNotFoundRoute',
    path: PATHS.componentDocs + '/*',
    component: Content404,
  },
];
export default GettingStartedRoute;
