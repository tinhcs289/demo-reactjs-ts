
import { createCellInnerComponent } from '@/components/table';
import type { RowData } from '../_types';
import { AsyncListItemActionsPopoverToggle } from '../context';
const CellAction = createCellInnerComponent<RowData>(AsyncListItemActionsPopoverToggle);
export default CellAction;
