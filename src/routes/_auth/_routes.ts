import LoginRoute from './LoginRoute';
import RegisterRoute from './RegisterRoute';
import { TRouteConfig } from '@/routes/types';

//TODO: add more route for auth pages here
const routes: TRouteConfig[] = [...LoginRoute, ...RegisterRoute];
export default routes;
