import { field, formItemSx } from "@/components/form";
import { required } from "@/constants/rhfRules";
import { i18n } from "@/translation";
export const fields = [
  field({
    name: 'Account',
    inputType: 'text',
    label: i18n.t<string>('login:account'),
    rules: required(i18n.t<string>('common:pleaseEnter')),
    sx: formItemSx,
  }),
  field({
    name: 'Password',
    inputType: 'text',
    label: i18n.t<string>('login:password'),
    rules: required(i18n.t<string>('common:pleaseEnter')),
    sx: formItemSx,
    componentProps: { type: 'password' }
  }),
  field({
    name: 'RememberMe',
    inputType: 'check',
    label: i18n.t<string>('login:rememberMe'),
    sx: formItemSx,
  }),
];