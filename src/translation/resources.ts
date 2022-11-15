import common from './common';
import login from './login';

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

export default resources;
