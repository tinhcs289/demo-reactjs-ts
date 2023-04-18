import { field } from '@/components/form';
import { AutoCompleteOption } from '@/components/rhfInputs/RHFSelect';
import { email, phone, required } from '@/constants/rhfRules';
import EMPTY_GUID from '@/helpers/stringHelpers/EMPTY_GUID';
import { i18n } from '@/translation';
import type { SxProps, Theme } from '@mui/material';
import type { FormValues } from './_types';
export const itemSx: SxProps<Theme> = { p: 1, mb: 2 };
export const GENDERS: { [x: string]: AutoCompleteOption } = {
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
export const defaultContact: FormValues = {
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
export const fields = [
  field({
    name: 'Title',
    inputType: 'text',
    label: i18n.t('contact:title'),
    rules: required(i18n.t('common:pleaseEnter')),
    md: 3,
    sx: itemSx,
  }),
  field({
    name: 'FirstName',
    inputType: 'text',
    label: i18n.t('contact:firstName'),
    rules: required(i18n.t('common:pleaseEnter')),
    md: 3,
    sx: itemSx,
  }),
  field({
    name: 'MiddleName',
    inputType: 'text',
    label: i18n.t('contact:middleName'),
    rules: required(i18n.t('common:pleaseEnter')),
    md: 3,
    sx: itemSx,
  }),
  field({
    name: 'LastName',
    inputType: 'text',
    label: i18n.t('contact:lastName'),
    rules: required(i18n.t('common:pleaseEnter')),
    md: 3,
    sx: itemSx,
  }),
  field({
    name: 'Gender',
    inputType: 'select',
    label: i18n.t('contact:gender'),
    rules: required(i18n.t('common:pleaseEnter')),
    md: 2,
    sx: itemSx,
    componentProps: { options: genderOptions },
  }),
  field({
    name: 'PhoneNumber',
    inputType: 'text',
    label: i18n.t('contact:phoneNumber'),
    rules: { ...required(i18n.t('common:pleaseEnter')), ...phone(i18n.t('common:invalidPhone')) },
    md: 5,
    sx: itemSx,
  }),
  field({
    name: 'EmailAddress',
    inputType: 'text',
    label: i18n.t('contact:emailAddress'),
    rules: { ...required(i18n.t('common:pleaseEnter')), ...email(i18n.t('common:invalidEmail')) },
    md: 5,
    sx: itemSx,
  }),
  field({
    name: 'Address',
    inputType: 'text',
    label: i18n.t('contact:address'),
    sx: itemSx,
    componentProps: { multiline: true, rows: 3 },
  }),
];