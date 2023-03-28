import PATHS from '@/constants/paths';
import type { RouteConfig } from '@/routes/_types';
const OrdersRoute: RouteConfig[] = [
  {
    name: 'OrdersBuyRoute',
    path: PATHS.ordersBuy,
  },
  {
    name: 'OrdersSellRoute',
    path: PATHS.ordersSell,
  },
  {
    name: 'OrdersProcessRoute',
    path: PATHS.ordersProcess,
  },
  {
    name: 'OrdersRoute',
    path: PATHS.orders,
    navigateTo: PATHS.ordersProcess,
  },
];
export default OrdersRoute;
