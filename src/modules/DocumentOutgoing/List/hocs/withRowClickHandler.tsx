import type { BodyRowProps } from '@/components/table';
import type { AnyObject } from '@/types';
import type { ComponentType, MouseEventHandler } from 'react';
import { useCallback } from 'react';
import { MUTATE_ACTION } from '../../constants';
import { useAsyncListAction } from '../context';
const ACTION = MUTATE_ACTION.UPDATE;
export default function withRowClickHandler<RowData extends AnyObject = AnyObject>(
  WrappedComponent: ComponentType<BodyRowProps<RowData>>
): ComponentType<BodyRowProps<RowData>> {
  return function TableRowWithClickHandler(props: BodyRowProps<RowData>) {
    const { setAction } = useAsyncListAction();
    const handleClick: MouseEventHandler<HTMLTableRowElement> = useCallback(
      (event) => {
        event?.stopPropagation?.();
        event?.preventDefault?.();
        if (!props?.row) return;
        setAction?.({ item: props.row, action: ACTION });
        return;
      },
      [props?.row, setAction]
    );
    return <WrappedComponent {...props} onClick={handleClick} />;
  };
}
