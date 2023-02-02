import newGuid from '@/helpers/stringHelpers/newGuid';
import { TAsideMenuItem } from '@/layouts/DashboardLayout/_types';
import PATHS from '@/routes/paths';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { i18n } from '@/translation';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import TableChartIcon from '@mui/icons-material/TableChart';
import GridOnIcon from '@mui/icons-material/GridOn';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

const asideMenuItems: TAsideMenuItem[] = [
  {
    id: newGuid(),
    label: i18n.t('aside:dashboard'),
    type: 'link',
    icon: DashboardIcon,
    url: PATHS.dashboard,
    childs: [
      {
        id: newGuid(),
        type: 'link',
        label: i18n.t('aside:demo.form_and_inputs'),
        icon: DynamicFormIcon,
        url: PATHS.dashboard1,
      },
      {
        id: newGuid(),
        type: 'link',
        label: i18n.t('aside:demo.data_table'),
        icon: TableChartIcon,
        url: PATHS.dashboard2,
      },
      {
        id: newGuid(),
        type: 'link',
        label: i18n.t('aside:demo.data_grid_list'),
        icon: GridOnIcon,
        url: PATHS.dashboard3,
      },
      {
        id: newGuid(),
        type: 'link',
        label: i18n.t('aside:demo.carousel'),
        icon: ViewCarouselIcon,
        url: PATHS.dashboard4,
      },
    ],
  },
  {
    id: newGuid(),
    label: i18n.t('aside:orders'),
    type: 'link',
    icon: ShoppingCartIcon,
    url: PATHS.inDevelop,
    childs: [
      {
        id: newGuid(),
        type: 'link',
        label: 'Orders 1',
        icon: KeyboardArrowRightOutlinedIcon,
        url: PATHS.inDevelop1,
      },
      {
        id: newGuid(),
        type: 'link',
        label: 'Orders 2',
        icon: KeyboardArrowRightOutlinedIcon,
        url: PATHS.inDevelop2,
      },
      {
        id: newGuid(),
        type: 'link',
        label: 'Orders 3',
        icon: KeyboardArrowRightOutlinedIcon,
        url: PATHS.inDevelop3,
      },
    ],
  },
  { id: newGuid(), type: 'link', label: i18n.t('aside:customers'), icon: PeopleIcon, url: PATHS.ramdom1 },
  { id: newGuid(), type: 'link', label: i18n.t('aside:reports'), icon: BarChartIcon, url: PATHS.ramdom2 },
  { id: newGuid(), type: 'link', label: 'Shopee', icon: StorefrontIcon, url: PATHS.shopee },
];
export default asideMenuItems;
