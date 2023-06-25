import CommonTextField from '@/components/inputs/CommonTextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DEFAULT_FORMAT } from './constants';
import CustomPickerActionBar from './CustomPickerActionBar';
import CustomToolbar from './CustomToolbar';
import EndIcon from './EndIcon';
import type { CommonDateFieldProps } from './_types';
export default function CommonDateField(props: CommonDateFieldProps) {
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
    <MobileDatePicker
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
            placeholder,
            error,
            errorText,
          } as any;
        },
      }}
    />
  );
}
