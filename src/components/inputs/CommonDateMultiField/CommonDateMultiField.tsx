import { CustomPickerActionBar } from '@/components/inputs/CommonDateField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import type { Moment } from 'moment';
import moment from 'moment';
import { useCallback, useMemo } from 'react';
import CustomInput from './CustomInput';
import CustomPickerDay from './CustomPickerDay';
import CustomPickerLayout from './CustomPickerLayout';
import CustomToolbar from './CustomToolbar';
import EndIcon from './EndIcon';
import type { CommonDateMultiFieldProps, DateTagInputItem } from './_types';
import { DEFAULT_FORMAT } from './constants';
import { addOrRemoveDate, datesFromTags, tagsFromDates } from './functions';
export default function CommonDateMultiField(props: CommonDateMultiFieldProps) {
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
    onChange,
    ...otherProps
  } = props;
  const dates = useMemo(() => (value instanceof Array ? value : []), [value]);
  const tags: DateTagInputItem[] = useMemo(() => tagsFromDates(dates, format), [dates, format]);
  const handleChangeTags = useCallback(
    (newTags?: DateTagInputItem[]) => {
      const newDates = datesFromTags(newTags);
      onChange?.(newDates);
      return;
    },
    [onChange]
  );
  const handleChange = useCallback(
    (date?: Moment) => {
      if (!date || !moment.isMoment(date)) return;
      const newDates = addOrRemoveDate(date, dates);
      onChange?.(newDates);
      return;
    },
    [dates, onChange]
  );
  const onClear = useCallback(() => {
    onChange?.([]);
  }, [onChange]);
  return (
    <MobileDatePicker
      {...otherProps}
      format={format || DEFAULT_FORMAT}
      closeOnSelect={!!closeOnSelect}
      value={null}
      onChange={handleChange as any}
      slots={{
        layout: CustomPickerLayout,
        toolbar: CustomToolbar,
        actionBar: CustomPickerActionBar,
        textField: CustomInput as any,
        day: CustomPickerDay,
        ...slots,
      }}
      slotProps={{
        ...slotProps,
        day: {
          dates,
          ...slotProps?.day,
        } as any,
        actionBar: {
          buttonOk,
          buttonClear,
          ButtonNegative,
          closeOnSelect,
          onClear,
          ...slotProps?.actionBar,
        } as any,
        toolbar: {
          label: props?.label || '',
          dates: dates || [],
          onDelete: handleChange,
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
            dates: tags,
            sx,
            placeholder: placeholder || TextFieldProps?.placeholder || undefined,
            error,
            errorText,
            onChangeTags: handleChangeTags,
          } as any;
        },
      }}
    />
  );
}
