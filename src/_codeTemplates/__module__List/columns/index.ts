import { renderCellInnerAs, tableConfig } from '@/components/CommonTable';
import { i18n } from '@/translation';
import type { T__module__ListItem } from '../_types';
import Action from './Action';
import BookingCode from './BookingCode';
import TotalPrice from './TotalPrice';

const columns = tableConfig<T__module__ListItem>(
  {
    field: 'bookingCode',
    headCell: i18n.t('booking:table.bookingCode'),
    bodyCellInner: renderCellInnerAs(BookingCode),
  },
  {
    field: 'name',
    headCell: i18n.t('booking:table.name'),
  },
  {
    field: 'totalPassenger',
    headCell: i18n.t('booking:table.totalPassenger'),
    headCellProps: { align: 'right' },
    bodyCellProps: { align: 'right' },
  },
  {
    field: 'totalPrice',
    headCell: i18n.t('booking:table.totalPrice'),
    headCellProps: { align: 'right' },
    bodyCellInner: renderCellInnerAs(TotalPrice),
    bodyCellProps: { align: 'right' },
  },
  {
    field: 'action',
    headCell: i18n.t('booking:table.action'),
    headCellProps: { align: 'center' },
    bodyCell: renderCellInnerAs(Action),
    bodyCellProps: { align: 'center' },
  }
);
export default columns;
