import type { TBodyCellInnerComponent } from '@/components/CommonTable/_types';
import type { TAny } from '@/_types/TAny';
import type { T__module__ListItem } from '../_types';

const BookingCode: TBodyCellInnerComponent<T__module__ListItem, TAny> = ({ row }) => {
  // use the hook `useAsyncList` here to interact with the List
  return <b>{row?.bookingCode || ''}</b>;
};
export default BookingCode;
