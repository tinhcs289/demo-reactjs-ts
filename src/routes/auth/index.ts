import type { RouteConfig } from '@/routes/_types';
import AuthNotFoundRoute from './AuthNotFoundRoute';
import LoginRoute from './LoginRoute';
import RegisterRoute from './RegisterRoute';

//TODO [Router] add more route for auth pages here
const routes: RouteConfig[] = [...LoginRoute, ...RegisterRoute, ...AuthNotFoundRoute];
export default routes;
