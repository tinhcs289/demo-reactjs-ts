import en from './en-US.json';
import vi from './vi-VN.json';
import type { TTranslation } from '@/translation/_types';
import { EAcceptLanguage } from '@/constants/EAcceptLanguage';

const common: TTranslation = { [EAcceptLanguage['en-US']]: en, [EAcceptLanguage['vi-VN']]: vi };
export default common;
