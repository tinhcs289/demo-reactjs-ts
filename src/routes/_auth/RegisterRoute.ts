import paths from '@/routes/paths';
import { TRouteConfig } from '@/routes/types';
import { lazy } from 'react';

const RegisterPage = lazy(() => import('@/pages/RegisterPage'));

const RegisterRoute: TRouteConfig[] = [
  {
    name: 'RegisterRoute',
    path: paths.register,
    component: RegisterPage,
  },
];
export default RegisterRoute;
