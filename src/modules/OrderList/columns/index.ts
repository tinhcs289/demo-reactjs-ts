import { renderCellInnerAs, tableConfig } from '@/components/CommonTable';
import { i18n } from '@/translation';
import type { TOrderListItem } from '../_types';
import Action from './Action';
import BookingCode from './BookingCode';
import TotalPrice from './TotalPrice';
import CreateBy from './CreatedBy';

const columns = tableConfig<TOrderListItem>(
  {
    field: 'bookingCode',
    headCell: i18n.t('booking:table.bookingCode'),
    bodyCellInner: renderCellInnerAs(BookingCode),
    bodyCellProps: { sx: { padding: '4px' } },
    stickyFirst: true,
  },
  {
    field: 'name',
    headCell: i18n.t('booking:table.name'),
    bodyCellProps: { sx: { padding: '4px' } },
    stickyFirst: true,
  },
  {
    field: 'totalPassenger',
    headCell: i18n.t('booking:table.totalPassenger'),
    headCellProps: { align: 'right' },
    bodyCellProps: { align: 'right', sx: { padding: '4px' } },
  },
  {
    field: 'totalPrice',
    headCell: i18n.t('booking:table.totalPrice'),
    headCellProps: { align: 'right' },
    bodyCellInner: renderCellInnerAs(TotalPrice),
    bodyCellProps: { align: 'right', sx: { padding: '8px' } },
  },
  {
    field: 'createdBy',
    headCell: i18n.t('booking:table:createdBy'),
    headCellProps: { align: 'left' },
    bodyCellInner: renderCellInnerAs(CreateBy),
    bodyCellProps: { align: 'left', sx: { padding: '4px' } },
  },
  {
    field: 'processUserName',
    headCell: i18n.t('booking:table:processUserName'),
    headCellProps: { align: 'left' },
    bodyCellInner: renderCellInnerAs(CreateBy),
    bodyCellProps: { align: 'left', sx: { padding: '4px' } },
    stickyLast: true,
  },
  {
    field: 'action',
    headCell: i18n.t('booking:table.action'),
    headCellProps: { align: 'center' },
    bodyCellInner: renderCellInnerAs(Action),
    bodyCellProps: { align: 'center', sx: { padding: '4px' } },
    stickyLast: true,
  },
);
export default columns;
