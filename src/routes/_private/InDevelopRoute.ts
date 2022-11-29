import paths from '@/routes/paths';
import type { TRouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const InDevelopPage = lazy(() => import('@/pages/InDevelopPage'));

const InDevelopRoute: TRouteConfig[] = [
  {
    name: 'InDevelopRoute1',
    path: paths.inDevelop1,
    component: InDevelopPage,
  },
  {
    name: 'InDevelopRoute2',
    path: paths.inDevelop2,
    component: InDevelopPage,
  },
  {
    name: 'InDevelopRoute3',
    path: paths.inDevelop3,
    component: InDevelopPage,
  },
  {
    name: 'InDevelopRoute',
    path: paths.inDevelop,
    component: InDevelopPage,
  },
];
export default InDevelopRoute;
