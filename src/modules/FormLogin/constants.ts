import { field, formItemSx } from '@/components/form';
import { required } from '@/constants/rhfRules';
import { i18n } from '@/translation';
import withShowOrHidePassword from './hocs/withShowOrHidePassword';
export const fields = [
  field({
    name: 'Account',
    inputType: 'text',
    label: i18n.t('login:account'),
    rules: required(i18n.t('common:pleaseEnter')),
    sx: formItemSx,
  }),
  field({
    name: 'Password',
    inputType: 'text',
    label: i18n.t('login:password'),
    rules: required(i18n.t('common:pleaseEnter')),
    hocs: [withShowOrHidePassword],
    sx: formItemSx,
    componentProps: { type: 'password' },
  }),
  field({
    name: 'RememberMe',
    inputType: 'check',
    label: i18n.t('login:rememberMe'),
    sx: formItemSx,
  }),
];
