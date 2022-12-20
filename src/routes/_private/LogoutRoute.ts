import paths from '@/routes/paths';
import wait from '@/functions/wait';
import type { TRouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const LogoutPage = lazy(() => wait().then(() => import('@/pages/LogoutPage')));

const LogoutRoute: TRouteConfig[] = [
  {
    name: 'LogoutPage',
    path: paths.logout,
    component: LogoutPage,
  },
];
export default LogoutRoute;
