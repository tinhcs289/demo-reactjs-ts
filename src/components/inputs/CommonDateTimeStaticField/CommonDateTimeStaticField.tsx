import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import CustomPickerActionBar from './CustomPickerActionBar';
import CustomToolbar from './CustomToolbar';
import type { CommonDateTimeStaticFieldProps } from './_types';
export default function CommonDateTimeStaticField(props: CommonDateTimeStaticFieldProps) {
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
    <StaticDateTimePicker
      {...(otherProps as any)}
      value={value}
      slots={
        {
          toolbar: CustomToolbar,
          actionBar: !noActionsBar ? CustomPickerActionBar : () => <></>,
          ...slots,
        } as any
      }
      slotProps={
        {
          ...slotProps,
          actionBar: !noActionsBar
            ? {
                buttonOk,
                buttonClear,
                ButtonNegative,
                ...slotProps?.actionBar,
              }
            : {},
          toolbar: {
            label: props?.label || '',
          },
        } as any
      }
    />
  );
}
