import type { TBodyCellInnerComponent } from '@/components/CommonTable';
import { CURRENCY_FORMAT } from '@/constants/language';
import type { TAny } from '@/types';
import numeral from 'numeral';
import type { T__module__ListItem } from '../_types';

const TotalPrice: TBodyCellInnerComponent<T__module__ListItem, TAny> = ({ row }) => {
  // use the hook `useAsyncList` here to interact with the List
  return <>{numeral(row?.totalPrice || 0).format(CURRENCY_FORMAT)}</>;
};
export default TotalPrice;
