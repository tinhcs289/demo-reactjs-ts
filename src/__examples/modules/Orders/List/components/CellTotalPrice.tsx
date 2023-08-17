import { createCellInnerComponent } from '@/components/table';
import { CURRENCY_FORMAT } from '@/constants/language';
import numeral from 'numeral';
import type { RowData } from '../_types';
const CellTotalPrice = createCellInnerComponent<RowData>(function TotalPrice(props) {
  return <>{numeral(props?.row?.totalPrice || 0).format(CURRENCY_FORMAT)}</>;
});
export default CellTotalPrice;
