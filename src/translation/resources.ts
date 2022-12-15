import { EAcceptLanguage } from '@/constants/language';
import booking from './booking';
import common from './common';
import login from './login';
import notFound from './notFound';
import register from './register';
import theme from './theme';
import type { TSubTranslation, TTranslation } from './_types';

const resources = {
  [EAcceptLanguage['en-US']]: {} as TSubTranslation,
  [EAcceptLanguage['vi-VN']]: {} as TSubTranslation,
};

const addTranslation = (name: string, translation: TTranslation) => {
  Object.keys(EAcceptLanguage).forEach((languageCode) => {
    resources[EAcceptLanguage[languageCode as `${EAcceptLanguage}`]][name] =
      translation[EAcceptLanguage[languageCode as `${EAcceptLanguage}`]];
  });
};

addTranslation('common', common);
addTranslation('login', login);
addTranslation('register', register);
addTranslation('notFound', notFound);
addTranslation('theme', theme);
addTranslation('booking', booking);

export default resources;
