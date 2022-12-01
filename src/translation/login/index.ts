import en from './en-US.json';
import vi from './vi-VN.json';
import type { TTranslation } from '@/translation/_types';
import { EAcceptLanguage } from '@/constants/EAcceptLanguage';

const login: TTranslation = { [EAcceptLanguage['en-US']]: en, [EAcceptLanguage['vi-VN']]: vi };
export default login;
