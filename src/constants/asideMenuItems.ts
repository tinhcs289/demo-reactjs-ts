import { default as asideMenuItems_demo } from '@/__examples/constants/asideMenuItems';
import { default as asideMenuItems_orders } from '@/constants/asideMenuItems.orders';
import asideMenuItems_qlvb from '@/constants/asideMenuItems.qlvb';
import PATHS from '@/constants/paths';
import { menuItem } from '@/helpers/asideMenuHelpers';
import type { TAsideMenuItem } from '@/layouts/DashboardLayout';
import { i18n } from '@/translation';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
const asideMenuItems: TAsideMenuItem[] = [
  menuItem({
    label: i18n.t('aside:dashboard'),
    labelText: i18n.t('aside:dashboard'),
    icon: DashboardIcon,
    url: PATHS.dashboard,
  }),
  ...asideMenuItems_qlvb,
  ...asideMenuItems_orders,
  menuItem({
    label: i18n.t('aside:customers'),
    labelText: i18n.t('aside:customers'),
    icon: PeopleIcon,
    url: PATHS.customers,
  }),
  menuItem({
    label: i18n.t('aside:reports'),
    labelText: i18n.t('aside:reports'),
    icon: BarChartIcon,
    url: PATHS.report,
  }),
  ...asideMenuItems_demo,
];
export default asideMenuItems;
