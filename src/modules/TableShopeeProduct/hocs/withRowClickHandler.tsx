import type { BodyRowProps } from '@/components/table';
import type { ComponentType, MouseEventHandler } from 'react';
import { useCallback } from 'react';
import type { RowData } from '../_types';
import { useAsyncListAction } from '../context';
export default function withRowClickHandler(
  WrappedComponent: ComponentType<BodyRowProps<RowData>>
): ComponentType<BodyRowProps<RowData>> {
  return function TableRowWithClickHandler(props: BodyRowProps<RowData>) {
    const { row } = props;
    const { checkOrUncheck } = useAsyncListAction();
    const handleClick: MouseEventHandler<HTMLTableRowElement> = useCallback(
      (event) => {
        event?.stopPropagation?.();
        event?.preventDefault?.();
        checkOrUncheck?.(row);
      },
      [row, checkOrUncheck]
    );
    return <WrappedComponent {...props} onClick={handleClick} />;
  };
}
