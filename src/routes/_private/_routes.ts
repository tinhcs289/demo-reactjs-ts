import type { TRouteConfig } from '@/routes/_types';
import DashboardRoute from './DashboardRoute';
import InDevelopRoute from './InDevelopRoute';

//TODO: add more route for private pages here
const routes: TRouteConfig[] = [...DashboardRoute, ...InDevelopRoute];
export default routes;
