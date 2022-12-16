import acceptLanguage from '@/appLocalStorages/acceptLanguage';
import language from '@/appLocalStorages/language';
import { LANGUAGE_DEFAULT, NUMERAL_FORMAT } from '@/constants/language';
import i18n from '@/translation/setupLanguage';
import numeral from 'numeral';
import './us';
import 'numeral/locales/vi';
import type { FC, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

numeral.locale(NUMERAL_FORMAT[language.get() || LANGUAGE_DEFAULT]);

acceptLanguage.onChange((event, detail) => {
  event?.stopPropagation?.();
  if (
    typeof window === 'undefined' ||
    typeof window.location === 'undefined' ||
    typeof window.location.reload !== 'function'
  ) {
    return;
  }
  window.location.reload();
});

const LanguageProvider: FC<{ children?: ReactNode }> = (props) => {
  const { children } = props;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
export default LanguageProvider;
