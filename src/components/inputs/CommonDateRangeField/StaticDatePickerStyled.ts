import { styled } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers';
import type { StaticDatePickerProps } from '@mui/x-date-pickers';
import type { Moment } from 'moment';
const StaticDatePickerStyled = styled(StaticDatePicker)<StaticDatePickerProps<Moment>>(({ theme }) => ({
  width: '320px',
  '.MuiDateCalendar-root': {
    borderTop: `1px solid ${theme.palette.divider}`,
    '.MuiPickersCalendarHeader-root': {
      marginTop: theme.spacing(1),
    },
  },
}));
export default StaticDatePickerStyled;
