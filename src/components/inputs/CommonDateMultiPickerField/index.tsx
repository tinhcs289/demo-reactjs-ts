import CommonTextField from '@/components/inputs/CommonTextField';
import InputErrorTextWithIcon from '@/components/inputs/InputErrorTextWithIcon';
import removeAt from '@/helpers/arrayHelpers/removeAt';
import byMomentASC from '@/helpers/arraySortHelpers/byMomentASC';
import { Theme } from '@mui/material';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import cloneDeep from 'lodash/cloneDeep';
import type { Moment } from 'moment';
import moment from 'moment';
import type { FC } from 'react';
import { useCallback, useMemo } from 'react';
import CustomPickersDay from './CustomPickersDay';
import FormControlLabelStyled from './FormControlLabelStyled';
import type { ICommonDateMultiPickerFieldProps } from './_types';

const toDay = moment();

const CommonDateMultiPickerField: FC<ICommonDateMultiPickerFieldProps> = (props) => {
  const {
    value,
    onChange,
    dayOfWeekFormatter,
    displayStaticWrapperAs,
    label,
    error,
    errorText,
    required,
    TextFieldProps,
    sx,
    ...otherProps
  } = props;

  const dates = useMemo(() => {
    return value instanceof Array ? value : [];
  }, [value]);

  const renderDay = useCallback(
    (day: Moment, selectedDays: Moment[], pickersDayProps: PickersDayProps<Moment>) => {
      const selected = dates.length === 0 ? false : dates.findIndex((d) => d.isSame(day, 'date')) >= 0;
      return <CustomPickersDay {...pickersDayProps} selected={selected} />;
    },
    [dates]
  );

  const handleChange = useCallback(
    (d: Moment | null) => {
      if (!d || !moment.isMoment(d)) return;

      let _dates = cloneDeep(dates);

      if (_dates.length === 0) {
        _dates.push(d);
        onChange?.(_dates);
        return;
      }

      const index = _dates.findIndex((_) => _.isSame(d, 'date'));
      if (index === -1) {
        _dates.push(d);
        _dates.sort(byMomentASC());
        onChange?.(_dates);
        return;
      }

      _dates = removeAt(_dates, index);
      if (_dates.length > 0) _dates.sort(byMomentASC());
      onChange?.(_dates);
      return;
    },
    [dates, onChange]
  );

  const $error = useMemo(() => {
    if (!error) return null;
    if (!errorText) return null;
    return (
      <InputErrorTextWithIcon
        style={{ display: 'flex' }}
        textProps={{ sx: { right: 'unset', left: '-50%' } }}
      >
        {errorText}
      </InputErrorTextWithIcon>
    );
  }, [error, errorText]);

  const $label = useMemo(() => {
    if (!label) return null;
    return (
      <>
        {$error}
        {label}
        {required ? ` *` : ''}
      </>
    );
  }, [label, required, $error]);

  const componentsProps = useMemo(() => {
    if (!error)
      return {
        typography: { noWrap: true },
      };
    return {
      typography: { noWrap: true, sx: { color: (t: Theme) => t?.palette?.error?.main } },
    };
  }, [error]);

  return (
    <FormControlLabelStyled
      label={$label}
      componentsProps={componentsProps as any}
      control={
        <StaticDatePicker
          dayOfWeekFormatter={dayOfWeekFormatter || ((d) => d)}
          toolbarTitle={label}
          value={toDay}
          onChange={handleChange}
          renderDay={renderDay}
          displayStaticWrapperAs={displayStaticWrapperAs || 'desktop'}
          {...(!!error ? { error } : {})}
          renderInput={(p) => <CommonTextField {...p} {...TextFieldProps} />}
          {...otherProps}
        />
      }
      sx={sx}
    />
  );
};
export default CommonDateMultiPickerField;
