import paths from '@/routes/paths';
import wait from '@/routes/wait';
import type { TRouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const RegisterPage = lazy(() => wait().then(() => import('@/pages/RegisterPage')));

const RegisterRoute: TRouteConfig[] = [
  {
    name: 'RegisterRoute',
    path: paths.register,
    component: RegisterPage,
  },
];
export default RegisterRoute;
