import { field, formItemSx } from '@/components/form';
import { email, required } from '@/constants/rhfRules';
import { contactFields } from '@/modules/FormContact';
import { i18n } from '@/translation';
import withPasswordAndPasswordReEnterdMustMatch from './hocs/withPasswordAndPasswordReEnterdMustMatch';
export const fields = [
  field({
    name: 'FirstName',
    inputType: 'text',
    label: i18n.t('register:firstName'),
    rules: required(i18n.t('common:pleaseEnter')),
    sx: formItemSx,
    md: 6,
  }),
  field({
    name: 'LastName',
    inputType: 'text',
    label: i18n.t('register:lastName'),
    rules: required(i18n.t('common:pleaseEnter')),
    sx: formItemSx,
    md: 6,
  }),
  field({
    name: 'Email',
    inputType: 'text',
    label: i18n.t('register:email'),
    rules: {
      ...required(i18n.t('common:pleaseEnter')),
      ...email(i18n.t('common:invalidEmail')),
    },
    sx: formItemSx,
  }),
  field({
    name: 'Password',
    inputType: 'text',
    label: i18n.t('register:password'),
    rules: required(i18n.t('common:pleaseEnter')),
    sx: formItemSx,
    componentProps: { type: 'password' },
  }),
  field({
    name: 'PasswordReEntered',
    inputType: 'text',
    label: i18n.t('register:passwordReEnter'),
    rules: required(i18n.t('register:pleaseEnter')),
    hocs: [withPasswordAndPasswordReEnterdMustMatch],
    sx: formItemSx,
    componentProps: { type: 'password' },
  }),
  field({
    name: 'IAcceptWithTermAndCondition',
    inputType: 'check',
    label: i18n.t('register:iAcceptWithTermAndCondition'),
    sx: formItemSx,
    rules: required(i18n.t('common:pleaseSelect')),
  }),
  field({
    name: 'Contact',
    fields: contactFields,
  }),
];
