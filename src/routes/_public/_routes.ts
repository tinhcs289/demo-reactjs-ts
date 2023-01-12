import type { TRouteConfig } from '@/routes/_types';
import NotFoundRoute from './NotFoundRoute';
import ShopeeRoute from './ShopeeRoute';

//TODO [Router] add more route for public pages here
const routes: TRouteConfig[] = [...ShopeeRoute, ...NotFoundRoute];
export default routes;
