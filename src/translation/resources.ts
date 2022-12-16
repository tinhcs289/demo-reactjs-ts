import { EAcceptLanguage } from '@/constants/language';
import aside from '@/translation/aside';
import booking from './booking';
import common from './common';
import login from './login';
import notFound from './notFound';
import register from './register';
import theme from './theme';
import type { TSubTranslation, TTranslation } from './_types';

//#region functions
type TLanguageKey = `${EAcceptLanguage}`;

const allKeys = Object.values(EAcceptLanguage);

const resources = allKeys.reduce((resrc, languageCode) => {
  resrc[languageCode] = {} as TSubTranslation;
  return resrc;
}, {} as TTranslation);

const addTranslation = (name: string, translation: TTranslation) => {
  allKeys.forEach((languageCode) => {
    resources[EAcceptLanguage[languageCode as TLanguageKey]][name] =
      translation[EAcceptLanguage[languageCode as TLanguageKey]];
  });
};
//#endregion

//#region Add translations
addTranslation('aside', aside);
addTranslation('common', common);
addTranslation('login', login);
addTranslation('register', register);
addTranslation('notFound', notFound);
addTranslation('theme', theme);
addTranslation('booking', booking);
//TODO [Multi-language] register more translations here
//#endregion

export default resources;
