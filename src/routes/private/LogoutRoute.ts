import paths from '@/constants/paths';
import wait from '@/functions/wait';
import type { RouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const LogoutPage = lazy(() => wait().then(() => import('@/pages/LogoutPage')));

const LogoutRoute: RouteConfig[] = [
  {
    name: 'LogoutPage',
    path: paths.logout,
    component: LogoutPage,
  },
];
export default LogoutRoute;
