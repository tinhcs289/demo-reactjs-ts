import { EAcceptLanguage } from '@/constants/EAcceptLanguage';

export type TTranslation = Record<EAcceptLanguage, { [x: string]: string }>;
