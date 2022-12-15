import { EAcceptLanguage } from '@/constants/language';

export type TSubTranslation = { [x: string]: string | TSubTranslation };
export type TTranslation = Record<EAcceptLanguage, TSubTranslation>;
