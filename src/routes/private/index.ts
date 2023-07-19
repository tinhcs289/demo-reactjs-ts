import type { RouteConfig } from '@/routes/_types';
import CustomersRoute from './CustomersRoute';
import DashboardRoute from './DashboardRoute';
import LogoutRoute from './LogoutRoute';
import OrdersRoute from './OrdersRoute';
import ReportRoute from './ReportRoute';
//TODO [Router] add more route for private pages here
const routes: RouteConfig[] = [
  ...DashboardRoute,
  ...ReportRoute,
  ...CustomersRoute,
  ...OrdersRoute,
  ...LogoutRoute,
];
export default routes;
