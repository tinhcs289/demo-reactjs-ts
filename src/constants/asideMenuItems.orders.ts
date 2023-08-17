import PATHS from '@/constants/paths';
import { menuItem } from '@/helpers/asideMenuHelpers';
import type { TAsideMenuItem } from '@/layouts/DashboardLayout';
import { i18n } from '@/translation';
import CameraRearIcon from '@mui/icons-material/CameraRear';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const asideMenuItems_orders: TAsideMenuItem[] = [
  menuItem({
    label: i18n.t('aside:orders'),
    labelText: i18n.t('aside:orders'),
    icon: ShoppingCartIcon,
    url: PATHS.orders,
    childs: [
      menuItem({
        label: 'Đơn mua',
        labelText: 'Đơn mua',
        icon: LoginIcon,
        url: PATHS.ordersBuy,
      }),
      menuItem({
        label: 'Đơn bán',
        labelText: 'Đơn bán',
        icon: LogoutIcon,
        url: PATHS.ordersSell,
      }),
      menuItem({
        label: 'Xử lý',
        labelText: 'Xử lý',
        icon: CameraRearIcon,
        url: PATHS.ordersProcess,
      }),
    ],
  }),
];
export default asideMenuItems_orders;
