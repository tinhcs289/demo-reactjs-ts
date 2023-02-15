import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type { ComponentType } from 'react';

const FormSubmitButton: ComponentType<ButtonProps> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <Button type="submit" color="primary" variant="contained" size="small" {...otherProps}>
      {children}
    </Button>
  );
};
export default FormSubmitButton;
