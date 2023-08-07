import paths from '@/constants/paths';
import wait from '@/helpers/asyncHelpers/wait';
import type { RouteConfig } from '@/routes/_types';
import { lazy } from 'react';

const RegisterPage = lazy(() => wait().then(() => import('@/pages/RegisterPage')));

const RegisterRoute: RouteConfig[] = [
  {
    name: 'RegisterRoute',
    path: paths.register,
    component: RegisterPage,
  },
];
export default RegisterRoute;
