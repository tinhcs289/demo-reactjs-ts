import type { AnyObject } from '@/types';
import type { BodyCellComponent, BodyCellRenderFunction } from '../_types';
/**
 * Override the `TableCell` Component
 * @param Cell the custom cell Component
 * @returns
 */
export default function createCellComponent<RowData extends AnyObject>(
  Cell: BodyCellComponent<RowData, AnyObject>
): BodyCellRenderFunction<RowData, AnyObject> {
  return function CustomCell(args) {
    return <Cell {...args} />;
  };
}
