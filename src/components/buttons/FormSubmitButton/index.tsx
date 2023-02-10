import type { FC } from 'react';
import Button from '@mui/material/Button';
import type { ButtonProps } from '@mui/material/Button';

const FormSubmitButton: FC<ButtonProps> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <Button type="submit" color="primary" variant="contained" {...otherProps}>
      {children}
    </Button>
  );
};
export default FormSubmitButton;
