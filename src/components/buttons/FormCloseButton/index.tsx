import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type { ComponentType } from 'react';

const FormCloseButton: ComponentType<ButtonProps> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <Button type="submit" color="primary" size="small" {...otherProps}>
      {children}
    </Button>
  );
};
export default FormCloseButton;
