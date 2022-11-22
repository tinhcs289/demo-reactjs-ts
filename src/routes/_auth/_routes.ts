import type { TRouteConfig } from '@/routes/_types';
import LoginRoute from './LoginRoute';
import RegisterRoute from './RegisterRoute';

//TODO: add more route for auth pages here
const routes: TRouteConfig[] = [...LoginRoute, ...RegisterRoute];
export default routes;
