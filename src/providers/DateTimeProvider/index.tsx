import language from '@/appLocalStorages/language';
import { LANGUAGE_DEFAULT, DATETIME_LOCALE } from '@/constants/language';
import type { LocalizationProviderProps } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
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
      adapterLocale={moment.locale(DATETIME_LOCALE[language.get() || LANGUAGE_DEFAULT])}
    >
      {children}
    </LocalizationProvider>
  );
};
export default DateTimeProvider;
