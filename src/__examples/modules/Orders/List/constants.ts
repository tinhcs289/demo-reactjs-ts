import { BodyRowHoc, menuActions, tableConfig } from '@/components/table';
import PATHS from '@/__examples/constants/paths';
import { i18n } from '@/translation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { RowData } from './_types';
import CellAction from './components/CellAction';
import CellBookingCode from './components/CellBookingCode';
import CellCreateBy from './components/CellCreateBy';
import CellDateUsed from './components/CellDateUsed';
import CellServices from './components/CellServices';
import CellToggleDetailPanel from './components/CellToggleDetailPanel';
import CellTotalPrice from './components/CellTotalPrice';
import MenuActionDelete from './components/MenuActionDelete';
import MenuActionOpenDetail from './components/MenuActionOpenDetail';
import withRowClickHandler from './hocs/withRowClickHandler';
export const actions = menuActions<RowData>([
  { render: MenuActionOpenDetail },
  { render: MenuActionDelete },
  { type: 'divider' },
  { label: 'Navigate to somewhere', icon: ArrowForwardIcon, to: PATHS.demoForm },
]);
export const columns = tableConfig<RowData>(
  {
    field: 'id',
    headCell: ' ',
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: CellToggleDetailPanel,
    bodyCellProps: { align: 'center', sx: { p: '4px' } },
    stickyFirst: true,
  },
  {
    field: 'bookingCode',
    headCell: i18n.t('booking:table.bookingCode'),
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: CellBookingCode,
    bodyCellProps: { sx: { padding: '4px' } },
    stickyFirst: true,
  },
  {
    field: 'name',
    headCell: i18n.t('booking:table.name'),
    bodyCellProps: { sx: { py: '4px', px: '8px' } },
    stickyFirst: true,
  },
  {
    field: 'bookingServices',
    headCell: i18n.t('booking:table.bookingServices'),
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: CellServices,
    bodyCellProps: { sx: { p: '8px' } },
  },
  {
    field: 'customGroupName',
    headCell: i18n.t('booking:table.customGroupName'),
    bodyCellProps: { sx: { whiteSpace: 'nowrap', width: '0%' } },
  },
  {
    field: 'customerName',
    headCell: i18n.t('booking:table.customerName'),
    bodyCellProps: { sx: { whiteSpace: 'nowrap', width: '0%' } },
  },
  {
    field: 'startDate',
    headCell: i18n.t('booking:table.startDate'),
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: CellDateUsed,
  },
  {
    field: 'totalPassenger',
    headCell: i18n.t('booking:table.totalPassenger'),
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellProps: { align: 'center', sx: { p: '4px' } },
  },
  {
    field: 'totalPrice',
    headCell: i18n.t('booking:table.totalPrice'),
    headCellProps: { align: 'right' },
    bodyCellInner: CellTotalPrice,
    bodyCellProps: {
      align: 'right',
      sx: {
        p: '8px',
        color: (t) => t?.palette?.primary?.dark,
        fontWeight: (t) => t?.typography?.fontWeightBold,
      },
    },
  },
  {
    field: 'createdBy',
    headCell: i18n.t('booking:table:createdBy'),
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: CellCreateBy,
    bodyCellProps: { align: 'left', sx: { p: '4px' } },
  },
  {
    field: 'processUserName',
    headCell: i18n.t('booking:table:processUserName'),
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: CellCreateBy,
    bodyCellProps: { align: 'left', sx: { p: '4px' } },
    stickyLast: true,
  },
  {
    field: '_action',
    headCell: i18n.t('booking:table.action'),
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: CellAction,
    bodyCellProps: { align: 'center', sx: { p: '4px' } },
    stickyLast: true,
  }
);
export const rowHocs: BodyRowHoc<RowData>[] = [withRowClickHandler];
