import { AnyObject } from '@/types';
import { Fragment } from 'react';
import type { CommonTableConfig } from '../_types';
import renderBodyCell from '../functions/renderBodyCell';
export default function BodyCellList<RowData extends AnyObject>(props: {
  row: RowData;
  rowIndex: number;
  columns: CommonTableConfig<RowData>[];
}) {
  const { row, columns, rowIndex } = props;
  return (
    <>
      {columns.map((cell) => {
        return <Fragment key={cell._key}>{renderBodyCell(cell, row, rowIndex)}</Fragment>;
      })}
    </>
  );
}
