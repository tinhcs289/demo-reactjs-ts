import Grid from '@mui/material/Grid';
import type { DayCalendarProps } from '@mui/x-date-pickers/internals';
import type { Moment } from 'moment';
import moment from 'moment';
import { useCallback, useMemo, useState, useEffect } from 'react';
import CustomPickerActionBar from './CustomPickerActionBar';
import CustomPickersDay from './CustomPickersDay';
import CustomToolbar from './CustomToolbar';
import StaticDatePickerStyled from './StaticDatePickerStyled';
import type { CommonDateRangeFieldProps } from './_types';
import { defaultNextMonth, defautlThisMonth } from './constants';
function dayOfWeekFormatter(day: string) {
  return day;
}
export default function CommonDateRangeField(props: CommonDateRangeFieldProps) {
  const {
    value,
    onChange,
    startDateLabel,
    startDatePickerProps,
    startDatePickerGridProps,
    endDateLabel,
    endDatePickerProps,
    endDatePickerGridProps,
    ...rootGridProps
  } = props;
  const [previousAct, setPreviousAct] = useState<'changeStart' | 'changeEnd' | null>(null);
  useEffect(
    () => () => {
      setPreviousAct(null);
    },
    []
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [thisMonth, setThisMonth] = useState<Moment>(defautlThisMonth);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nextMonth, setNextMonth] = useState<Moment>(defaultNextMonth);
  const startDate = useMemo(() => {
    if (!value?.from || !moment.isMoment(value.from)) return moment();
    return value.from;
  }, [value?.from]);
  const endDate = useMemo(() => {
    if (!value?.to || !moment.isMoment(value.to)) return moment();
    return value.to;
  }, [value?.to]);
  const handleChangeStartDate = useCallback(
    (value: Moment | null | undefined) => {
      const shouldChangeEndDate = previousAct === 'changeStart' && moment.isMoment(startDate);
      if (shouldChangeEndDate) {
        onChange?.({ from: startDate, to: value || moment() });
        setPreviousAct('changeEnd');
        return;
      }
      onChange?.({ from: value || moment(), to: endDate });
      setPreviousAct('changeStart');
    },
    [onChange, endDate, previousAct, startDate]
  );
  const handleChangeEndDate = useCallback(
    (value: Moment | null | undefined) => {
      const shouldChangeStartDate = previousAct === 'changeEnd' && moment.isMoment(endDate);
      if (shouldChangeStartDate) {
        onChange?.({ from: value || moment(), to: endDate });
        setPreviousAct('changeStart');
        return;
      }
      onChange?.({ from: startDate, to: value || moment() });
      setPreviousAct('changeEnd');
    },
    [onChange, startDate, previousAct, endDate]
  );
  const getDayProps = useCallback(
    (
      ownerState: DayCalendarProps<Moment> & {
        day: Moment;
        selected: boolean;
      }
    ) => {
      const { day, slotProps } = ownerState;
      const isHoverable = day.diff(endDate) > 0 || day.diff(startDate) < 0;
      const dayIsBetween = day.isBetween(startDate, endDate, null, '[]');
      const isFirstDay = day.diff(startDate) === 0;
      const isLastDay = day.diff(endDate) === 0;
      const isToday = day.format('DD/MM/YYYY') === moment().format('DD/MM/YYYY');
      return {
        isHoverable,
        dayIsBetween,
        isFirstDay,
        isLastDay,
        isToday,
        ...slotProps?.day,
      };
    },
    [startDate, endDate]
  );
  const thisMonthMaxDate: Moment = useMemo(() => thisMonth.endOf('month'), [thisMonth]);
  const nextMonthMinDate: Moment = useMemo(() => nextMonth.startOf('month'), [nextMonth]);
  const $PickerStartDate = useMemo(() => {
    return (
      <StaticDatePickerStyled
        dayOfWeekFormatter={dayOfWeekFormatter}
        value={thisMonth}
        onChange={handleChangeStartDate as any}
        displayStaticWrapperAs="mobile"
        slots={
          {
            actionBar: CustomPickerActionBar,
            toolbar: CustomToolbar,
            day: CustomPickersDay,
            ...startDatePickerProps?.slots,
          } as any
        }
        slotProps={
          {
            day: getDayProps,
            toolbar: {
              label: startDateLabel || 'from',
              customDate: value?.from || undefined,
              ...startDatePickerProps?.slotProps?.toolbar,
            },
            ...startDatePickerProps?.slotProps,
          } as any
        }
        maxDate={thisMonthMaxDate}
        {...(startDatePickerProps as any)}
      />
    );
  }, [
    handleChangeStartDate,
    getDayProps,
    startDateLabel,
    startDatePickerProps,
    thisMonth,
    thisMonthMaxDate,
    value?.from,
  ]);
  const $PickerEndDate = useMemo(() => {
    return (
      <StaticDatePickerStyled
        dayOfWeekFormatter={dayOfWeekFormatter}
        value={nextMonth}
        onChange={handleChangeEndDate as any}
        displayStaticWrapperAs="mobile"
        slots={
          {
            actionBar: CustomPickerActionBar,
            toolbar: CustomToolbar,
            day: CustomPickersDay,
            ...endDatePickerProps?.slots,
          } as any
        }
        slotProps={
          {
            day: getDayProps,
            toolbar: {
              label: endDateLabel || 'to',
              customDate: value?.to || undefined,
              ...endDatePickerProps?.slotProps?.toolbar,
            },
            ...endDatePickerProps?.slotProps,
          } as any
        }
        minDate={nextMonthMinDate}
        {...(endDatePickerProps as any)}
      />
    );
  }, [
    handleChangeEndDate,
    getDayProps,
    endDateLabel,
    endDatePickerProps,
    nextMonth,
    nextMonthMinDate,
    value?.to,
  ]);
  return (
    <Grid container {...rootGridProps}>
      <Grid item xs={12} lg={6} {...startDatePickerGridProps}>
        {$PickerStartDate}
      </Grid>
      <Grid item xs={12} lg={6} {...endDatePickerGridProps}>
        {$PickerEndDate}
      </Grid>
    </Grid>
  );
}
