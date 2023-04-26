import PATHS from '@/constants/paths';
import newGuid from '@/helpers/stringHelpers/newGuid';
import type { TAsideMenuItem } from '@/layouts/DashboardLayout';
import { i18n } from '@/translation';
import BarChartIcon from '@mui/icons-material/BarChart';
import CameraRearIcon from '@mui/icons-material/CameraRear';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import GridOnIcon from '@mui/icons-material/GridOn';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TableChartIcon from '@mui/icons-material/TableChart';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import MapIcon from '@mui/icons-material/Map';
const asideMenuItems: TAsideMenuItem[] = [
  {
    id: newGuid(),
    label: i18n.t('aside:dashboard'),
    labelText: i18n.t<string>('aside:dashboard'),
    type: 'link',
    icon: DashboardIcon,
    url: PATHS.dashboard,
    childs: [
      {
        id: newGuid(),
        type: 'link',
        label: i18n.t('aside:demo.form_and_inputs'),
        labelText: i18n.t<string>('aside:demo.form_and_inputs'),
        icon: DynamicFormIcon,
        url: PATHS.demoForm,
      },
      {
        id: newGuid(),
        type: 'link',
        label: i18n.t('aside:demo.data_table'),
        labelText: i18n.t<string>('aside:demo.data_table'),
        icon: TableChartIcon,
        url: PATHS.demoTable,
      },
      {
        id: newGuid(),
        type: 'link',
        label: i18n.t('aside:demo.data_grid_list'),
        labelText: i18n.t<string>('aside:demo.data_grid_list'),
        icon: GridOnIcon,
        url: PATHS.demoDataGrid,
      },
      {
        id: newGuid(),
        type: 'link',
        label: i18n.t('aside:demo.carousel'),
        labelText: i18n.t<string>('aside:demo.carousel'),
        icon: ViewCarouselIcon,
        url: PATHS.demoCarousel,
      },
      {
        id: newGuid(),
        type: 'link',
        label: i18n.t('aside:demo.googleMap'),
        labelText: i18n.t<string>('aside:demo.googleMap'),
        icon: MapIcon,
        url: PATHS.demoGoogleMap,
      },
    ],
  },
  {
    id: newGuid(),
    label: i18n.t('aside:orders'),
    labelText: i18n.t<string>('aside:orders'),
    type: 'link',
    icon: ShoppingCartIcon,
    url: PATHS.orders,
    childs: [
      {
        id: newGuid(),
        type: 'link',
        label: 'Đơn mua',
        labelText: 'Đơn mua',
        icon: LoginIcon,
        url: PATHS.ordersBuy,
      },
      {
        id: newGuid(),
        type: 'link',
        label: 'Đơn bán',
        labelText: 'Đơn bán',
        icon: LogoutIcon,
        url: PATHS.ordersSell,
      },
      {
        id: newGuid(),
        type: 'link',
        label: 'Xử lý',
        labelText: 'Xử lý',
        icon: CameraRearIcon,
        url: PATHS.ordersProcess,
      },
    ],
  },
  {
    id: newGuid(),
    type: 'link',
    label: i18n.t('aside:customers'),
    labelText: i18n.t<string>('aside:customers'),
    icon: PeopleIcon,
    url: PATHS.customers,
  },
  {
    id: newGuid(),
    type: 'link',
    label: i18n.t('aside:reports'),
    labelText: i18n.t<string>('aside:reports'),
    icon: BarChartIcon,
    url: PATHS.report,
  },
  {
    id: newGuid(),
    type: 'link',
    label: 'Shopee',
    labelText: 'Shopee',
    icon: StorefrontIcon,
    url: PATHS.shopee,
  },
];
export default asideMenuItems;
