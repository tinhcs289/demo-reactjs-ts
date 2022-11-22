import common from './common';
import login from './login';
import notFound from './notFound';
import register from './register';

const resources = {
  en: {} as { [x: string]: { [x: string]: string } },
  vi: {} as { [x: string]: { [x: string]: string } },
};

const addTranslation = (name: string, translation: { vi: { [x: string]: string }; en: { [x: string]: string } }) => {
  resources.en[name] = translation.en;
  resources.vi[name] = translation.vi;
};

addTranslation('common', { en: common.en, vi: common.vi });
addTranslation('login', { en: login.en, vi: login.vi });
addTranslation('register', { en: register.en, vi: register.vi });
addTranslation('notFound', { en: notFound.en, vi: notFound.vi });

export default resources;
