import { tableConfig } from '@/components/CommonTable';
import type { TBodyCellInnerRenderFunction } from '@/components/CommonTable/_types';
import { CURRENCY_FORMAT } from '@/constants/language';
import { i18n } from '@/translation';
import numeral from 'numeral';
import type { TQuotationListItem } from './_types';
import { ActionCell } from './context';

const bookingCodeRender: TBodyCellInnerRenderFunction<TQuotationListItem> = ({ row }) => (
  <b>{row?.bookingCode || ''}</b>
);

const totalPriceRender: TBodyCellInnerRenderFunction<TQuotationListItem> = ({ row }) =>
  numeral(row?.totalPrice || 0).format(CURRENCY_FORMAT);

const renderAction: TBodyCellInnerRenderFunction<TQuotationListItem> = (props) => {
  return <ActionCell {...props} />;
};

const columns = tableConfig<TQuotationListItem>(
  {
    field: 'bookingCode',
    headCell: i18n.t('booking:table.bookingCode'),
    bodyCellInner: bookingCodeRender,
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
    bodyCellInner: totalPriceRender,
    bodyCellProps: { align: 'right' },
  },
  {
    field: 'action',
    headCell: i18n.t('booking:table.action'),
    headCellProps: { align: 'center' },
    bodyCell: renderAction,
    bodyCellProps: { align: 'center' },
  },
);
export default columns;
