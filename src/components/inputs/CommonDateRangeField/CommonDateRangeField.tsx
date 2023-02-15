import CommonTextField from '@/components/inputs/CommonTextField';
import Grid from '@mui/material/Grid';
import type { TextFieldProps } from '@mui/material/TextField';
import type { PickersDayProps } from '@mui/x-date-pickers';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import type { Moment } from 'moment';
import moment from 'moment';
import type { MouseEventHandler } from 'react';
import { createRef, useCallback, useMemo } from 'react';
import CustomPickersDay from './CustomPickersDay';
import type { TCommonDateRangeFieldProps } from './_types';

const toDay = moment(moment().format('YYYY/MM/DD') + ' 00:00:00', 'YYYY/MM/DD hh:mm:ss');

function dayOfWeekFormatter(day: string) {
  return day;
}

function renderInput(props: TextFieldProps) {
  return <CommonTextField {...props} />;
}

type HandleChangeDate = (value: Moment | null, keyboardInputValue?: string | undefined) => void;

type RenderDay = (
  day: Moment,
  selectedDays: Moment[],
  pickersDayProps: PickersDayProps<Moment>
) => JSX.Element;

export default function CommonDateRangeField(props: TCommonDateRangeFieldProps) {
  const {
    value,
    onChange,
    sx,
    // ...otherProps
  } = props;

  const startDateRef = createRef<HTMLDivElement>();
  const endDateRef = createRef<HTMLDivElement>();

  const startDate = useMemo(() => {
    if (!value?.from || !moment.isMoment(value.from)) return toDay;
    return value.from;
  }, [value?.from]);

  const endDate = useMemo(() => {
    if (!value?.to || !moment.isMoment(value.to)) return toDay;
    return value.to;
  }, [value?.to]);

  const handleChangeStartDate: HandleChangeDate = useCallback(
    (value) => {
      onChange?.({ from: value || toDay, to: endDate });
    },
    [onChange, endDate]
  );

  const handleChangeEndDate: HandleChangeDate = useCallback(
    (value) => {
      onChange?.({ from: startDate, to: value || toDay });
    },
    [onChange, startDate]
  );

  const handleHoverOnDay: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {}, []);

  const renderDay: RenderDay = useCallback(
    (day, _, pickersDayProps) => {
      const isHoverable = day.diff(endDate) > 0 || day.diff(startDate) < 0;
      const dayIsBetween = day.isBetween(startDate, endDate, null, '[]');
      const isFirstDay = day.diff(startDate) === 0;
      const isLastDay = day.diff(endDate) === 0;
      return (
        <CustomPickersDay
          {...pickersDayProps}
          disableMargin
          isHoverable={isHoverable}
          dayIsBetween={dayIsBetween}
          isFirstDay={isFirstDay}
          isLastDay={isLastDay}
          onMouseOver={handleHoverOnDay}
        />
      );
    },
    [startDate, endDate, handleHoverOnDay]
  );

  return (
    <Grid container sx={sx}>
      <Grid item xs={12} lg={6}>
        <StaticDatePicker
          ref={startDateRef}
          dayOfWeekFormatter={dayOfWeekFormatter}
          value={startDate}
          onChange={handleChangeStartDate}
          displayStaticWrapperAs="desktop"
          renderInput={renderInput}
          renderDay={renderDay}
          maxDate={endDate}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <StaticDatePicker
          ref={endDateRef}
          dayOfWeekFormatter={dayOfWeekFormatter}
          value={endDate}
          onChange={handleChangeEndDate}
          displayStaticWrapperAs="desktop"
          renderInput={renderInput}
          renderDay={renderDay}
          minDate={startDate}
        />
      </Grid>
    </Grid>
  );
}
