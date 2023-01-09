import { renderCellInnerAs, tableConfig } from '@/components/CommonTable';
import { i18n } from '@/translation';
import { ListItemActionMenuToggle } from '../context';
import type { TOrderListItem } from '../_types';
import BookingCode from './BookingCode';
import CreateBy from './CreatedBy';
import DateUsed from './DateUsed';
import TotalPrice from './TotalPrice';
import Services from './Services';
import DetailPanelToggle from './DetailPanelToggle';

const columns = tableConfig<TOrderListItem>(
  {
    field: 'id',
    headCell: ' ',
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: renderCellInnerAs(DetailPanelToggle),
    bodyCellProps: { align: 'center', sx: { p: '4px' } },
    stickyFirst: true,
  },
  {
    field: 'bookingCode',
    headCell: i18n.t('booking:table.bookingCode'),
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: renderCellInnerAs(BookingCode),
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
    bodyCellInner: renderCellInnerAs(Services),
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
    bodyCellInner: renderCellInnerAs(DateUsed),
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
    bodyCellInner: renderCellInnerAs(TotalPrice),
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
    bodyCellInner: renderCellInnerAs(CreateBy),
    bodyCellProps: { align: 'left', sx: { p: '4px' } },
  },
  {
    field: 'processUserName',
    headCell: i18n.t('booking:table:processUserName'),
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: renderCellInnerAs(CreateBy),
    bodyCellProps: { align: 'left', sx: { p: '4px' } },
    stickyLast: true,
  },
  {
    field: 'action',
    headCell: i18n.t('booking:table.action'),
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: renderCellInnerAs(ListItemActionMenuToggle),
    bodyCellProps: { align: 'center', sx: { p: '4px' } },
    stickyLast: true,
  },
);
export default columns;
