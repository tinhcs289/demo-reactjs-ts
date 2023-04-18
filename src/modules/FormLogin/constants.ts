import { field } from "@/components/form";
import { required } from "@/constants/rhfRules";
import { i18n } from "@/translation";
import type { SxProps, Theme } from "@mui/material";
export const fieldSx: SxProps<Theme> = { p: 1, mb: 2 };
export const fields = [
  field({
    name: 'Account',
    inputType: 'text',
    label: i18n.t<string>('login:account'),
    rules: required(i18n.t<string>('common:pleaseEnter')),
    sx: fieldSx,
  }),
  field({
    name: 'Password',
    inputType: 'text',
    label: i18n.t<string>('login:password'),
    rules: required(i18n.t<string>('common:pleaseEnter')),
    sx: fieldSx,
    componentProps: { type: 'password' }
  }),
  field({
    name: 'RememberMe',
    inputType: 'check',
    label: i18n.t<string>('login:rememberMe'),
    sx: fieldSx,
  }),
];