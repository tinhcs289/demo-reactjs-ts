import { createCellInnerComponent } from '@/components/table';
import type { RowData } from '../_types';
import { AsyncListItemActionMenuToggle } from '../context';
const CellAction = createCellInnerComponent<RowData>(AsyncListItemActionMenuToggle);
export default CellAction;
