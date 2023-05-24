import type { BodyRowProps } from '@/components/table';
import { useAsyncListAction } from '../context';
import type { AnyObject } from '@/types';
import type { ComponentType, MouseEventHandler } from 'react';
import { useCallback } from 'react';
export default function withRowClickHandler<RowData extends AnyObject = AnyObject>(
  WrappedComponent: ComponentType<BodyRowProps<RowData>>
): ComponentType<BodyRowProps<RowData>> {
  return function TableRowWithClickHandler(props: BodyRowProps<RowData>) {
    const { checkOrUncheck } = useAsyncListAction();
    const handleClick: MouseEventHandler<HTMLTableRowElement> = useCallback(
      (event) => {
        event?.stopPropagation?.();
        event?.preventDefault?.();
        checkOrUncheck?.(props?.row);
      },
      [props?.row, checkOrUncheck]
    );
    return <WrappedComponent {...props} onClick={handleClick} />;
  };
}
