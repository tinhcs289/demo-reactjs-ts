import { CustomPickerActionBar } from '@/components/inputs/CommonDateField';
import CommonTextField from '@/components/inputs/CommonTextField';
import InputAdornment from '@mui/material/InputAdornment';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DEFAULT_FORMAT } from './constants';
import CustomToolbar from './CustomToolbar';
import type { CommonTimeFieldProps } from './_types';
function EndIcon() {
  return (
    <InputAdornment position="end">
      <span className="material-symbols-outlined">schedule</span>
    </InputAdornment>
  );
}
export default function CommonTimeField(props: CommonTimeFieldProps) {
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
    buttonCancel,
    closeOnSelect,
    ...otherProps
  } = props;
  return (
    //@ts-ignore
    <MobileTimePicker
      {...otherProps}
      value={value}
      format={format || DEFAULT_FORMAT}
      closeOnSelect={!!closeOnSelect}
      slots={
        {
          toolbar: CustomToolbar,
          actionBar: CustomPickerActionBar,
          textField: CommonTextField as any,
          ...slots,
        } as any
      }
      slotProps={
        {
          ...slotProps,
          actionBar: {
            buttonOk,
            buttonClear,
            buttonCancel,
            closeOnSelect,
            ...slotProps?.actionBar,
          } as any,
          toolbar: {
            label: props?.label || '',
          } as any,
          //@ts-ignore
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
        } as any
      }
    />
  );
}
