import type { TBodyCellInnerComponent } from '@/components/CommonTable/_types';
import type { TAny } from '@/_types/TAny';
import type { TOrderListItem } from '../_types';

const BookingCode: TBodyCellInnerComponent<TOrderListItem, TAny> = ({ row }) => {
  // use the hook `useAsyncList` here to interact with the List
  return <b>{row?.bookingCode || ''}</b>;
};
export default BookingCode;
