import { styled } from '@mui/material';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import type { Moment } from 'moment';
import type { ComponentType } from 'react';

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
})) as ComponentType<PickersDayProps<Moment>>;
export default CustomPickersDay;
