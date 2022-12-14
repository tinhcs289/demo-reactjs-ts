import type { TBookingSellListItem } from '@/api/booking/_types';
import { tableConfig } from '@/components/CommonTable';
import type { TBodyCellInnerRenderFunction } from '@/components/CommonTable/_types';
import toCurrencyFormat from '@/helpers/stringHelpers/toCurrencyFormat';

const bookingCodeRender: TBodyCellInnerRenderFunction<TBookingSellListItem> = ({ row }) => (
  <b>{row?.bookingCode || ''}</b>
);

const totalPriceRender: TBodyCellInnerRenderFunction<TBookingSellListItem> = ({ row }) =>
  toCurrencyFormat(row?.totalPrice);

const columns = tableConfig<TBookingSellListItem>(
  { field: 'bookingCode', headCell: 'Mã', bodyCellInner: bookingCodeRender },
  { field: 'name', headCell: 'Đơn hàng' },
  { field: 'totalPassenger', headCell: 'Hành khách' },
  { field: 'totalPrice', headCell: 'Thành tiền', bodyCellInner: totalPriceRender },
);
export default columns;
