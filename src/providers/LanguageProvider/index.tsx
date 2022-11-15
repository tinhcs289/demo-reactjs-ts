import i18n from '@/translation/setupLanguage';
import React from 'react';
import { I18nextProvider } from 'react-i18next';

const LanguageProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { children } = props;
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
export default LanguageProvider;
