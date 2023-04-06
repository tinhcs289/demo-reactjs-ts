import { FormGridFields, field } from '@/components/form';
import { email, phone, required } from '@/constants/rhfRules';
import { i18n } from '@/translation';
import type { FormProps } from './_types';
import { genderOptions, itemSx } from './contants';
const fields = [
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
export default function Form(props: FormProps) {
  return <FormGridFields fields={fields} />;
}
