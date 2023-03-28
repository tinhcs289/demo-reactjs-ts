import paths from '@/constants/paths';
import wait from '@/functions/wait';
import type { RouteConfig } from '@/routes/_types';
import { lazy } from 'react';
const LoginPage = lazy(() => wait().then(() => import('@/pages/LoginPage')));
const LoginRoute: RouteConfig[] = [
  {
    name: 'LoginRoute',
    path: paths.login,
    component: LoginPage,
  },
];
export default LoginRoute;
