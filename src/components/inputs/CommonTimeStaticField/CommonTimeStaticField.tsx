import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import CustomPickerActionBar from './CustomPickerActionBar';
import CustomToolbar from './CustomToolbar';
import type { CommonTimeStaticFieldProps } from './_types';
export default function CommonDateStaticField(props: CommonTimeStaticFieldProps) {
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
    <StaticTimePicker
      {...otherProps}
      value={value}
      slots={
        {
          toolbar: CustomToolbar,
          actionBar: !noActionsBar ? CustomPickerActionBar : () => <></>,
          ...slots,
        } as any
      }
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
