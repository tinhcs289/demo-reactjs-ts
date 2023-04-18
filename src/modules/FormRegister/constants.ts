import { field } from "@/components/form";
import { email, required } from "@/constants/rhfRules";
import { i18n } from "@/translation";
import type { SxProps, Theme } from "@mui/material";
import withPasswordAndPasswordReEnterdMustMatch from './hocs/withPasswordAndPasswordReEnterdMustMatch';
import { fields as contactFields } from '@/modules/FormContact';
export const fieldSx: SxProps<Theme> = { p: 1, mb: 2 };
export const fields = [
  field({
    name: 'FirstName',
    inputType: 'text',
    label: i18n.t<string>('register:firstName'),
    rules: required(i18n.t<string>('common:pleaseEnter')),
    sx: fieldSx,
    md: 6,
  }),
  field({
    name: 'LastName',
    inputType: 'text',
    label: i18n.t<string>('register:lastName'),
    rules: required(i18n.t<string>('common:pleaseEnter')),
    sx: fieldSx,
    md: 6,
  }),
  field({
    name: 'Email',
    inputType: 'text',
    label: i18n.t<string>('register:email'),
    rules: {
      ...required(i18n.t<string>('common:pleaseEnter')),
      ...email(i18n.t<string>('common:invalidEmail')),
    },
    sx: fieldSx,
  }),
  field({
    name: 'Password',
    inputType: 'text',
    label: i18n.t<string>('register:password'),
    rules: required(i18n.t<string>('common:pleaseEnter')),
    sx: fieldSx,
    componentProps: { type: 'password' }
  }),
  field({
    name: 'PasswordReEntered',
    inputType: 'text',
    label: i18n.t<string>('register:passwordReEnter'),
    rules: required(i18n.t<string>('register:pleaseEnter')),
    hocs: [withPasswordAndPasswordReEnterdMustMatch],
    sx: fieldSx,
    componentProps: { type: 'password' }
  }),
  field({
    name: 'IAcceptWithTermAndCondition',
    inputType: 'check',
    label: i18n.t<string>('register:iAcceptWithTermAndCondition'),
    sx: fieldSx,
    rules: required(i18n.t<string>('common:pleaseSelect')),
  }),
  field({
    name: 'Contact',
    fields: contactFields
  })
];