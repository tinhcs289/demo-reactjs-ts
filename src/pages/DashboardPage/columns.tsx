import type { TBookingSellListItem } from '@/api/booking/_types';
import { tableConfig } from '@/components/CommonTable';
import type { TBodyCellInnerRenderFunction } from '@/components/CommonTable/_types';
import toCurrencyFormat from '@/helpers/stringHelpers/toCurrencyFormat';
import { i18n } from '@/translation';

const bookingCodeRender: TBodyCellInnerRenderFunction<TBookingSellListItem> = ({ row }) => (
  <b>{row?.bookingCode || ''}</b>
);

const totalPriceRender: TBodyCellInnerRenderFunction<TBookingSellListItem> = ({ row }) =>
  toCurrencyFormat(row?.totalPrice);

const columns = tableConfig<TBookingSellListItem>(
  { field: 'bookingCode', headCell: i18n.t('booking:table.bookingCode'), bodyCellInner: bookingCodeRender },
  { field: 'name', headCell: i18n.t('booking:table.name') },
  { field: 'totalPassenger', headCell: i18n.t('booking:table.totalPassenger') },
  { field: 'totalPrice', headCell: i18n.t('booking:table.totalPrice'), bodyCellInner: totalPriceRender },
);
export default columns;
