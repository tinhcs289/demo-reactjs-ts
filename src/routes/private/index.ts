import type { RouteConfig } from '@/routes/_types';
import GettingStartedRoute from '../../__examples/routes/GettingStartedRoute';
import CustomersRoute from './CustomersRoute';
import DashboardRoute from './DashboardRoute';
import DocumentIncomingRoutes from './DocumentIncomingRoutes';
import LogoutRoute from './LogoutRoute';
import OrdersRoute from './OrdersRoute';
import ReportRoute from './ReportRoute';
//TODO [Router] add more route for private pages here
const routes: RouteConfig[] = [
  ...GettingStartedRoute,
  ...DashboardRoute,
  ...ReportRoute,
  ...CustomersRoute,
  ...OrdersRoute,
  ...DocumentIncomingRoutes,
  ...LogoutRoute,
];
export default routes;
