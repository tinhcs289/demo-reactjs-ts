import PATHS from '@/__examples/constants/paths';
import { environmentIs } from '@/environments/getEnvironmentName';
import { divider, menuItem } from '@/helpers/asideMenuHelpers';
import type { TAsideMenuItem } from '@/layouts/DashboardLayout';
import { i18n } from '@/translation';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import GridOnIcon from '@mui/icons-material/GridOn';
import MapIcon from '@mui/icons-material/Map';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TableChartIcon from '@mui/icons-material/TableChart';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
export const asideMenuItems: TAsideMenuItem[] = environmentIs.qlvb()
  ? []
  : [
      divider(),
      menuItem({
        label: 'Hướng dẫn',
        labelText: 'Hướng dẫn',
        type: 'link',
        icon: AutoStoriesIcon,
        url: PATHS.componentDocs,
        childs: [
          menuItem({
            label: i18n.t('aside:demo.data_table'),
            labelText: i18n.t('aside:demo.data_table'),
            icon: TableChartIcon,
            url: PATHS.demoTable,
          }),
          menuItem({
            label: i18n.t('aside:demo.form_and_inputs'),
            labelText: i18n.t('aside:demo.form_and_inputs'),
            icon: DynamicFormIcon,
            url: PATHS.demoForm,
          }),
          menuItem({
            label: i18n.t('aside:demo.data_grid_list'),
            labelText: i18n.t('aside:demo.data_grid_list'),
            icon: GridOnIcon,
            url: PATHS.demoDataGrid,
          }),
          menuItem({
            label: i18n.t('aside:demo.carousel'),
            labelText: i18n.t('aside:demo.carousel'),
            icon: ViewCarouselIcon,
            url: PATHS.demoCarousel,
          }),
          menuItem({
            label: i18n.t('aside:demo.googleMap'),
            labelText: i18n.t('aside:demo.googleMap'),
            icon: MapIcon,
            url: PATHS.demoGoogleMap,
          }),
        ],
      }),
      menuItem({
        label: 'Shopee',
        labelText: 'Shopee',
        icon: StorefrontIcon,
        url: PATHS.shopee,
      }),
    ];
export default asideMenuItems;
