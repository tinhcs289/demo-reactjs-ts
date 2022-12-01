import CommonTextField from '@/components/inputs/CommonTextField';
import removeAt from '@/helpers/arrayHelpers/removeAt';
import byMomentASC from '@/helpers/arraySortHelpers/byMomentASC';
import { styled } from '@mui/material';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import cloneDeep from 'lodash/cloneDeep';
import type { Moment } from 'moment';
import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import type { ICommonDateMultiFieldProps } from './_types';

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<PickersDayProps<Moment>>(({ theme, selected }) => ({
  ...(selected && {
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
})) as React.ComponentType<PickersDayProps<Moment>>;

const toDay = moment();

const CommonDateMultiField: React.FC<ICommonDateMultiFieldProps> = (props) => {
  const { value, onChange, dayOfWeekFormatter, displayStaticWrapperAs, error, errorText, ...otherProps } = props;

  const dates = useMemo(() => {
    return value instanceof Array ? value : [];
  }, [value]);

  const renderDay = useCallback(
    (day: Moment, selectedDays: Moment[], pickersDayProps: PickersDayProps<Moment>) => {
      const selected = dates.length === 0 ? false : dates.findIndex((d) => d.isSame(day, 'date')) >= 0;
      return <CustomPickersDay {...pickersDayProps} selected={selected} />;
    },
    [dates],
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
    [dates, onChange],
  );

  return (
    <StaticDatePicker
      dayOfWeekFormatter={dayOfWeekFormatter || ((d) => d)}
      value={toDay}
      onChange={handleChange}
      renderDay={renderDay}
      displayStaticWrapperAs={displayStaticWrapperAs || 'desktop'}
      {...(!!error ? { error } : {})}
      renderInput={(p) => {
        return <CommonTextField {...p} error={error} errorText={errorText} />;
      }}
      {...otherProps}
    />
  );
};
export default CommonDateMultiField;
