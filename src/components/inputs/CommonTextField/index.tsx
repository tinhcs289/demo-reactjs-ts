import InputErrorTextWithIcon from '@/components/inputs/InputErrorTextWithIcon';
import InputAdornment from '@mui/material/InputAdornment';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import debounce from 'lodash/debounce';
import React from 'react';

const CommonTextField: React.FC<TextFieldProps> = (props) => {
  const { helperText, error, InputProps, ...otherProps } = props;
  return (
    <TextField
      size="small"
      margin="none"
      variant="outlined"
      color="primary"
      fullWidth
      error={error}
      {...otherProps}
      InputProps={{
        ...InputProps,
        ...(error === true && !!helperText
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <InputErrorTextWithIcon>{helperText}</InputErrorTextWithIcon>
                </InputAdornment>
              ),
            }
          : {}),
      }}
    />
  );
};
export default CommonTextField;

const withDebounceChangeHandler =
  (ms: number) => (WrappedComponent: React.FC<TextFieldProps>) => (props: TextFieldProps) => {
    const { value, defaultValue, ...otherProps } = props;

    const handleChangeDelay = React.useMemo(() => {
      return debounce((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props?.onChange?.(e);
      }, ms);
    }, [props]);
    return <WrappedComponent {...otherProps} defaultValue={value || defaultValue} onChange={handleChangeDelay} />;
  };

export const CommonTextFieldDebounced = withDebounceChangeHandler(300)(CommonTextField);
