import { styled } from '@mui/material/styles';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import type { Moment } from 'moment';
import type { ComponentType } from 'react';
interface CustomPickerDayProps extends PickersDayProps<Moment> {
  isHoverable: boolean;
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
  isToday: boolean;
}
const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' &&
    prop !== 'isFirstDay' &&
    prop !== 'isLastDay' &&
    prop !== 'isHoverable' &&
    prop !== 'isToday',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderRadius: 0,
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
    backgroundColor: theme.palette.primary.main,
  }),
  ...(isLastDay && {
    borderRadius: 0,
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    backgroundColor: theme.palette.primary.main,
  }),
})) as ComponentType<CustomPickerDayProps>;
export default CustomPickersDay;
