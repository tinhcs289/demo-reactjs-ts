import language from '@/appLocalStorages/language';
import { DATETIME_LOCALE, LANGUAGE_DEFAULT } from '@/constants/language';
import type { LocalizationProviderProps } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/vi';
export type DateTimeProviderProps = Omit<LocalizationProviderProps, 'dateAdapter' | 'moment' | 'locale'>;
export default function DateTimeProvider(props: DateTimeProviderProps) {
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
}
