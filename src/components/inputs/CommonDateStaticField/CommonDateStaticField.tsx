import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import CustomPickerActionBar from './CustomPickerActionBar';
import CustomToolbar from './CustomToolbar';
import type { CommonDateStaticFieldProps } from './_types';
export default function CommonDateStaticField(props: CommonDateStaticFieldProps) {
  const {
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
    noActionsBar = false,
    ...otherProps
  } = props;
  return (
    <StaticDatePicker
      {...otherProps}
      value={value}
      slots={{
        toolbar: CustomToolbar,
        actionBar: !noActionsBar ? CustomPickerActionBar : () => <></>,
        ...slots,
      }}
      slotProps={{
        ...slotProps,
        actionBar: !noActionsBar
          ? {
              buttonOk,
              buttonClear,
              ButtonNegative,
              ...slotProps?.actionBar,
            }
          : ({} as any),
        toolbar: {
          label: props?.label || '',
        } as any,
      }}
    />
  );
}
