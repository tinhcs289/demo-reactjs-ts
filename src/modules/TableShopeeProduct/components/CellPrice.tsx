import { createCellInnerComponent } from '@/components/table';
import numeral from 'numeral';
import type { RowData } from '../_types';
const CellPrice = createCellInnerComponent<RowData>(function TotalPrice(props) {
  return <>{numeral((props?.row?.price || 0) / 100000).format('0,0[.]00$')}</>;
});
export default CellPrice;
