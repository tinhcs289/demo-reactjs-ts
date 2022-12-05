import InputErrorTextWithIcon from '@/components/inputs/InputErrorTextWithIcon';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import debounce from 'lodash/debounce';
import type { FC, Ref } from 'react';
import { forwardRef, useMemo } from 'react';
import type { TCommonTextFieldProps } from './_types';

const CommonTextField: FC<TCommonTextFieldProps> = forwardRef((props, ref?: Ref<any>) => {
  const { errorText, error, InputProps, ...otherProps } = props;
  return (
    <TextField
      size="small"
      margin="none"
      variant="outlined"
      color="primary"
      ref={ref}
      fullWidth
      error={error}
      // InputLabelProps={{ shrink: true }}
      {...otherProps}
      InputProps={{
        ...InputProps,
        ...(error === true && !!errorText
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <InputErrorTextWithIcon>{errorText}</InputErrorTextWithIcon>
                </InputAdornment>
              ),
            }
          : {}),
      }}
    />
  );
});
export default CommonTextField;

const withDebounceChangeHandler =
  (ms: number) => (WrappedComponent: FC<TCommonTextFieldProps>) => (props: TCommonTextFieldProps) => {
    const { value, defaultValue, ...otherProps } = props;

    const handleChangeDelay = useMemo(() => {
      return debounce((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props?.onChange?.(e);
      }, ms);
    }, [props]);
    return <WrappedComponent {...otherProps} defaultValue={value || defaultValue} onChange={handleChangeDelay} />;
  };

export const CommonTextFieldDebounced = withDebounceChangeHandler(300)(CommonTextField);
