import CommonTextField from '@/components/inputs/CommonTextField';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DEFAULT_FORMAT } from './constants';
import EndIcon from './EndIcon';
import type { CommonKeyboardDateFieldProps } from './_types';
export default function CommonKeyboardDateField(props: CommonKeyboardDateFieldProps) {
  const { format, InputProps, error, errorText, placeholder, sx, value, TextFieldProps, ...otherProps } =
    props;
  return (
    <DateField
      {...otherProps}
      defaultValue={value}
      format={format || DEFAULT_FORMAT}
      {...(!!error ? { error } : {})}
      slots={{ textField: CommonTextField }}
      slotProps={{
        textField(ownerState) {
          const { slots: _, slotProps: __, ...state } = ownerState;
          return {
            ...state,
            ...TextFieldProps,
            sx,
            placeholder,
            error,
            errorText,
            InputProps: {
              endAdornment: <EndIcon />,
              ...InputProps,
            },
          } as any;
        },
      }}
    />
  );
}
