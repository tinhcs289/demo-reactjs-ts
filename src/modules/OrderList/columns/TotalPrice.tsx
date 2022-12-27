import type { TBodyCellInnerComponent } from '@/components/CommonTable/_types';
import { CURRENCY_FORMAT } from '@/constants/language';
import type { TAny } from '@/_types/TAny';
import numeral from 'numeral';
import type { TOrderListItem } from '../_types';

const TotalPrice: TBodyCellInnerComponent<TOrderListItem, TAny> = ({ row }) => {
  // use the hook `useAsyncList` here to interact with the List
  return <>{numeral(row?.totalPrice || 0).format(CURRENCY_FORMAT)}</>;
};
export default TotalPrice;
