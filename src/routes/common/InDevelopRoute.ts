import paths from '@/constants/paths';
import wait from '@/functions/wait';
import type { RouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const InDevelopPage = lazy(() => wait().then(() => import('@/pages/InDevelopPage')));

const InDevelopRoute: RouteConfig[] = [
  {
    name: 'InDevelopRoute',
    path: paths.inDevelop,
    component: InDevelopPage,
  },
];
export default InDevelopRoute;
