import { styled } from '@mui/material';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import type { Moment } from 'moment';
import { useMemo } from 'react';
import type { CustomPickerDayProps } from './_types';
const PickersDayStyled = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<PickersDayProps<Moment> & { isSelected: boolean }>(({ theme, isSelected }) => ({
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
}));
export default function CustomPickerDay(props: CustomPickerDayProps) {
  const { dates, day, ...otherProps } = props;
  const isSelected = useMemo(() => {
    if (!dates || dates.length === 0) return false;
    const index = dates.findIndex((d) => d.isSame(day, 'date'));
    return index >= 0;
  }, [dates, day]);
  return <PickersDayStyled {...(otherProps as any)} day={day} isSelected={isSelected} />;
}
