import paths from '@/routes/paths';
import type { TRouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const LogoutPage = lazy(() => import('@/pages/LogoutPage'));

const LogoutRoute: TRouteConfig[] = [
  {
    name: 'LogoutPage',
    path: paths.logout,
    component: LogoutPage,
  },
];
export default LogoutRoute;
