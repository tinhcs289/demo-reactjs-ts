import type { CheckboxProps } from '@mui/material/Checkbox';
import CheckBox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import type { FC } from 'react';

const CheckCell: FC<Omit<CheckboxProps, 'onChange'> & { onChange?: (checked: boolean) => void }> = (props) => {
  const { checked, onChange, ...otherProps } = props;
  return (
    <TableCell align="center" padding="checkbox">
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
