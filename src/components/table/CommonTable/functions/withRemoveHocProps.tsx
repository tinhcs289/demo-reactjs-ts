import type { AnyObject } from '@/types';
import type { ComponentType } from 'react';
import type { BodyRowProps } from '../_types';
export default function withRemoveHocProps<RowData extends AnyObject = AnyObject>(
  WrappedComponent: ComponentType<BodyRowProps<RowData>>
): ComponentType<BodyRowProps<RowData>> {
  return function TableRowWithNoCustomProps(props: BodyRowProps<RowData>) {
    const {
      rowId: __rowId,
      row: __row,
      rowIndex: __rowIndex,
      totalOfCells: __totalOfCells,
      columns: __columns,
      ...otherProps
    } = props;
    return <WrappedComponent {...(otherProps as any)} />;
  };
}
