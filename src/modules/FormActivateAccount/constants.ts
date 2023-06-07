import { field, formItemSx } from '@/components/form';
import { required } from '@/constants/rhfRules';
import { i18n } from '@/translation';
import type { FormValues } from './_types';
export const defaultValues: FormValues = {
  username: '',
  optCode: '',
};
export const fields = [
  field({
    name: 'username',
    inputType: 'text',
    label: 'Tài khoản',
    rules: required(i18n.t('common:pleaseEnter')),
    sx: formItemSx,
  }),
  field({
    name: 'optCode',
    inputType: 'text',
    label: 'Mã kích hoạt',
    rules: required(i18n.t('common:pleaseEnter')),
    sx: formItemSx,
    componentProps: { autoFocus: true },
  }),
];