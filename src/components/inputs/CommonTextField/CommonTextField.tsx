import InputErrorTextWithIcon from '@/components/inputs/InputErrorTextWithIcon';
import type { InputLabelProps, SxProps, Theme } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import type { ComponentType, Ref } from 'react';
import { forwardRef, useMemo } from 'react';
import { DEFAULT_VARIANT } from './constants';
import TextFieldStyled from './TextFieldStyled';
import type { TCommonTextFieldProps } from './_types';

const bootstrapVariantSx: SxProps<Theme> = {
  '& > label': {
    left: '-12px',
  },
  '& div.MuiInputBase-root': {
    marginTop: (t) => t.spacing(1.5),
    '& fieldset': {
      top: 0,
      '& legend': {
        display: 'none',
      },
    },
  },
};

const CommonTextField: ComponentType<TCommonTextFieldProps> = forwardRef((props, ref?: Ref<any>) => {
  const {
    id,
    errorText,
    error,
    InputLabelProps,
    InputProps,
    inputProps,
    variant = DEFAULT_VARIANT,
    sx,
    placeholder,
    ...otherProps
  } = props;

  const memoVariant = useMemo(() => {
    if (!variant) return 'outlined';
    if (variant === 'filled' || variant === 'outlined' || variant === 'standard') return variant;
    if (
      variant === 'bootstrap:filled' ||
      variant === 'bootstrap:outlined' ||
      variant === 'bootstrap:standard'
    )
      return variant.split(':')[1] as 'filled' | 'outlined' | 'standard';

    return 'outlined';
  }, [variant]);

  const memoSx: SxProps<Theme> | undefined = useMemo(() => {
    if (
      variant === 'bootstrap:filled' ||
      variant === 'bootstrap:outlined' ||
      variant === 'bootstrap:standard'
    )
      return { ...sx, ...bootstrapVariantSx };
    return sx;
  }, [sx, variant]);

  const inputId: { id: string } | null = useMemo(() => {
    if (typeof id !== 'string') return null;
    return { id: `${id}__input`, itemID: id };
  }, [id]);

  const labelProps: Partial<InputLabelProps> | null | undefined = useMemo(() => {
    const _props = { ...InputLabelProps, shrink: true };
    if (typeof id !== 'string') return _props;
    return { ..._props, id: `${id}__label` };
  }, [id, InputLabelProps]);

  const errorId: { id: string } | null = useMemo(() => {
    if (typeof id !== 'string') return null;
    return { id: `${id}__error` };
  }, [id]);

  return (
    <TextFieldStyled
      {...inputId}
      size="small"
      margin="none"
      variant={memoVariant}
      color="primary"
      ref={ref}
      fullWidth
      error={error}
      placeholder={placeholder || ''}
      {...otherProps}
      sx={memoSx}
      inputProps={inputProps}
      InputLabelProps={labelProps}
      InputProps={{
        ...InputProps,
        ...(error === true && !!errorText
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <InputErrorTextWithIcon {...errorId}>{errorText}</InputErrorTextWithIcon>
                </InputAdornment>
              ),
            }
          : {}),
      }}
    />
  );
});
export default CommonTextField;
