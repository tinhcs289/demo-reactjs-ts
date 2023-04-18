import type { CheckboxProps } from '@mui/material/Checkbox';
import CheckBox from '@mui/material/Checkbox';
import type { TableCellProps } from '@mui/material/TableCell';
import TableCell from '@mui/material/TableCell';
import type { ComponentType } from 'react';
const CheckCell: ComponentType<
  Omit<CheckboxProps, 'onChange'> & { onChange?: (checked: boolean) => void; cellProps?: TableCellProps }
> = (props) => {
  const { checked, onChange, cellProps, ...otherProps } = props;
  return (
    <TableCell align="center" padding="checkbox" {...cellProps}>
      <CheckBox
        disableRipple
        disableTouchRipple
        color="primary"
        {...otherProps}
        checked={checked}
        onChange={(_, checked) => {
          onChange?.(checked);
        }}
      />
    </TableCell>
  );
};
export default CheckCell;
