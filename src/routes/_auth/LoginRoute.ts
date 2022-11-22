import paths from '@/routes/paths';
import type { TRouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const LoginPage = lazy(() => import('@/pages/LoginPage'));

const LoginRoute: TRouteConfig[] = [
  {
    name: 'LoginRoute',
    path: paths.login,
    component: LoginPage,
  },
];
export default LoginRoute;
