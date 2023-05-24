import type { AnyObject } from '@/types';
import type { BodyCellInnerComponent, BodyCellInnerRenderFunction } from '../_types';
/**
 * Override the `children` of `TableCell` Component
 * @param Cell the custom cell children
 */
export default function createCellInnerComponent<RowData extends AnyObject>(
  CellInner: BodyCellInnerComponent<RowData, AnyObject>
): BodyCellInnerRenderFunction<RowData, AnyObject> {
  return function CustomCellInner(args) {
    return <CellInner {...args} />;
  };
}
