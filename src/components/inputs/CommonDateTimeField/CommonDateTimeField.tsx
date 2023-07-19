import { CustomPickerActionBar } from '@/components/inputs/CommonDateField';
import CommonTextField from '@/components/inputs/CommonTextField';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DEFAULT_FORMAT } from './constants';
import CustomToolbar from './CustomToolbar';
import EndIcon from './EndIcon';
import type { CommonDateTimeFieldProps } from './_types';
export default function CommonDateTimeField(props: CommonDateTimeFieldProps) {
  const {
    format,
    error,
    errorText,
    placeholder,
    sx,
    value,
    slotProps,
    slots,
    TextFieldProps,
    buttonOk,
    buttonClear,
    ButtonNegative,
    closeOnSelect,
    ...otherProps
  } = props;
  return (
    <MobileDateTimePicker
      {...otherProps}
      value={value}
      format={format || DEFAULT_FORMAT}
      closeOnSelect={!!closeOnSelect}
      slots={{
        toolbar: CustomToolbar,
        actionBar: CustomPickerActionBar,
        textField: CommonTextField as any,
        ...slots,
      }}
      slotProps={{
        ...slotProps,
        actionBar: {
          buttonOk,
          buttonClear,
          ButtonNegative,
          closeOnSelect,
          ...slotProps?.actionBar,
        } as any,
        toolbar: {
          label: props?.label || '',
        } as any,
        textField(ownerState) {
          const { slots: _, slotProps: __, ...state } = ownerState;
          return {
            ...state,
            ...TextFieldProps,
            InputProps: {
              endAdornment: <EndIcon />,
              ...TextFieldProps?.InputProps,
            },
            sx,
            placeholder: placeholder || TextFieldProps?.placeholder || undefined,
            error,
            errorText,
          } as any;
        },
      }}
    />
  );
}
