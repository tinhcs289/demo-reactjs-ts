import type { SxProps, Theme } from '@mui/material';
import type { Moment } from 'moment';

export type TCommonDateRangeFieldValue = {
  from: Moment;
  to: Moment;
};
export type TCommonDateRangeFieldProps = {
  value?: TCommonDateRangeFieldValue;
  onChange?: (range?: TCommonDateRangeFieldValue) => void;
  sx?: SxProps<Theme>;
};
