import { LANGUAGE_VIETNAMESE } from '@/constants/language';
import { LocalizationProvider, LocalizationProviderProps } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/vi';
import React from 'react';

export type DateTimeProviderProps = Omit<LocalizationProviderProps, 'dateAdapter' | 'moment' | 'locale'>;

const DateTimeProvider: React.FC<DateTimeProviderProps> = (props) => {
  const { children, ...otherProps } = props;

  return (
    <LocalizationProvider
      {...otherProps}
      dateAdapter={AdapterMoment}
      moment={moment}
      adapterLocale={moment.locale(LANGUAGE_VIETNAMESE)}
    >
      {children}
    </LocalizationProvider>
  );
};
export default DateTimeProvider;
