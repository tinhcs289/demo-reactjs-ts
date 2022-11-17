import { lazy } from 'react';
import paths from '@/routes/paths';
import { TRouteConfig } from '@/routes/_types';

const LoginPage = lazy(() => import('@/pages/LoginPage'));

const LoginRoute: TRouteConfig[] = [
  {
    name: 'LoginRoute',
    path: paths.login,
    component: LoginPage,
  },
];
export default LoginRoute;
