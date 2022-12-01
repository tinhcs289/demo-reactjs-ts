import { EAcceptLanguage } from '@/constants/EAcceptLanguage';
import common from './common';
import login from './login';
import notFound from './notFound';
import register from './register';
import type { TTranslation } from './_types';

const resources = {
  [EAcceptLanguage['en-US']]: {} as { [x: string]: { [x: string]: string } },
  [EAcceptLanguage['vi-VN']]: {} as { [x: string]: { [x: string]: string } },
};

const addTranslation = (name: string, translation: TTranslation) => {
  resources[EAcceptLanguage['en-US']][name] = translation[EAcceptLanguage['en-US']];
  resources[EAcceptLanguage['vi-VN']][name] = translation[EAcceptLanguage['vi-VN']];
};

addTranslation('common', common);
addTranslation('login', login);
addTranslation('register', register);
addTranslation('notFound', notFound);

export default resources;
