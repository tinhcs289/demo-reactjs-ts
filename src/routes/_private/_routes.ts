import type { TRouteConfig } from '@/routes/_types';
import DashboardRoute from './DashboardRoute';
import InDevelopRoute from './InDevelopRoute';
import LogoutRoute from './LogoutRoute';

//TODO [Router] add more route for private pages here
const routes: TRouteConfig[] = [...DashboardRoute, ...InDevelopRoute, ...LogoutRoute];
export default routes;
