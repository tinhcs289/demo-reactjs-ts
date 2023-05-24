import type { CheckboxProps } from '@mui/material/Checkbox';
import CheckBox from '@mui/material/Checkbox';
import type { TableCellProps } from '@mui/material/TableCell';
import TableCell from '@mui/material/TableCell';
import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback } from 'react';
export default function CheckCell(
  props: Omit<CheckboxProps, 'onChange'> & {
    onChange?: (checked: boolean) => void;
    cellProps?: TableCellProps;
  }
) {
  const { checked, onChange, cellProps, ...otherProps } = props;
  const handleCheck = useCallback(
    (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      event?.stopPropagation?.();
      onChange?.(checked);
    },
    [onChange]
  );
  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation?.();
  }, []);
  return (
    <TableCell align="center" padding="checkbox" {...cellProps}>
      <CheckBox
        disableRipple
        disableTouchRipple
        color="primary"
        {...otherProps}
        checked={checked}
        onChange={handleCheck}
        // the `onClick` event on Row level is higher order than `onChange` event on the cell level.
        // so the `onChange` handler here may not work
        onClick={handleClick}
      />
    </TableCell>
  );
}
