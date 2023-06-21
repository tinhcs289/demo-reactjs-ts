/* eslint-disable */
//@ts-nocheck
import { field, formItemSx } from '@/components/form';
import { required } from '@/constants/rhfRules';
import { i18n } from '@/translation';
import type { FormValues } from './_types';
export const defaultValues: FormValues = {
  Id: -1,
  SomeField: '',
};
export const fields = [
  field({
    name: 'SomeField',
    inputType: 'text',
    label: 'SomeField',
    rules: required(i18n.t('common:pleaseEnter')),
    md: 3,
    sx: formItemSx,
  }),
];
