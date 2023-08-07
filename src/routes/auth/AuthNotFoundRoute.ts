import paths from '@/constants/paths';
import wait from '@/helpers/asyncHelpers/wait';
import type { RouteConfig } from '@/routes/_types';
import { lazy } from 'react';
const NotFoundPage = lazy(() => wait().then(() => import('@/modules/Content404')));
const AuthNotFoundRoute: RouteConfig[] = [
  {
    name: 'AuthNotFoundRoute',
    path: paths.authNotFound,
    component: NotFoundPage,
  },
];
export default AuthNotFoundRoute;
