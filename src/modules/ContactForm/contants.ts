import { TAutoCompleteOption } from '@/components/rhfInputs/RHFSelect';
import EMPTY_GUID from '@/helpers/stringHelpers/EMPTY_GUID';
import { i18n } from '@/translation';
import type { SxProps, Theme } from '@mui/material';
import type { TContactFormValue } from './_types';

export const itemSx: SxProps<Theme> = { p: 1, mb: 2 };

export const GENDERS: { [x: string]: TAutoCompleteOption } = {
  MALE: { label: i18n.t('common:male'), value: 'male' },
  FEMALE: {
    label: i18n.t('common:female'),
    value: 'female',
  },
  OTHER: {
    label: i18n.t('common:other'),
    value: 'other',
  },
};

export const genderOptions = Object.values(GENDERS);

export const defaultContact: TContactFormValue = {
  Id: EMPTY_GUID,
  Title: i18n.t<string>('contact:default.title'),
  FirstName: '',
  MiddleName: '',
  LastName: '',
  Gender: GENDERS.MALE,
  PhoneNumber: '',
  EmailAddress: '',
  Address: '',
};
