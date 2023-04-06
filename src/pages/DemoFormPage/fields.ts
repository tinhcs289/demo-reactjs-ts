import { field } from '@/components/form';
import { required } from '@/constants/rhfRules';
import { i18n } from '@/translation';
import type { SxProps, Theme } from '@mui/material';
import { LABEL, optionRadio, options, optionsCheck } from './constants';
const fieldSx: SxProps<Theme> = { p: 1, mb: 2 };
const fields = [
  field({
    name: 'SwitchField',
    inputType: 'switch',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseSelect')),
    md: 4,
    sx: fieldSx,
  }),
  field({
    name: 'CheckField',
    inputType: 'check',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseSelect')),
    md: 4,
    sx: fieldSx,
  }),
  field({
    name: 'RadioField',
    inputType: 'radio',
    label: LABEL,
    md: 4,
    sx: fieldSx,
  }),
  field({
    name: 'TextField',
    inputType: 'text',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseEnter')),
    componentProps: {
      placeholder: i18n.t<string>('common:pleaseEnter'),
    },
    md: 3,
    sx: fieldSx,
  }),
  field({
    name: 'SelectField',
    inputType: 'select',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseSelect')),
    componentProps: {
      placeholder: i18n.t<string>('common:pleaseSelect'),
      options: options,
    },
    md: 3,
    sx: fieldSx,
  }),
  field({
    name: 'SelectMultiField',
    inputType: 'select-multi',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseSelect')),
    componentProps: {
      placeholder: i18n.t<string>('common:pleaseSelect'),
      options: options,
      multiple: true,
    },
    md: 3,
    sx: fieldSx,
  }),
  field({
    name: 'SelectBooleanField',
    inputType: 'select-boolean',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseSelect')),
    componentProps: {
      placeholder: i18n.t<string>('common:pleaseSelect'),
      labelTrue: i18n.t<string>('common:yes'),
      labelFalse: i18n.t<string>('common:no'),
    },
    md: 3,
    sx: fieldSx,
  }),
  field({
    name: 'DateField',
    inputType: 'date',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseSelect')),
    componentProps: {
      placeholder: i18n.t<string>('common:pleaseSelect'),
      buttonOk: i18n.t<string>('common:apply'),
      buttonCancel: i18n.t<string>('common:cancel'),
      buttonClear: i18n.t<string>('common:clear'),
    },
    md: 4,
    sx: fieldSx,
  }),
  field({
    name: 'DateTimeField',
    inputType: 'date-time',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseSelect')),
    componentProps: {
      placeholder: i18n.t<string>('common:pleaseSelect'),
      buttonOk: i18n.t<string>('common:apply'),
      buttonCancel: i18n.t<string>('common:cancel'),
      buttonClear: i18n.t<string>('common:clear'),
    },
    md: 4,
    sx: fieldSx,
  }),
  field({
    name: 'TimeField',
    inputType: 'time',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseSelect')),
    componentProps: {
      placeholder: i18n.t<string>('common:pleaseSelect'),
      buttonOk: i18n.t<string>('common:apply'),
      buttonCancel: i18n.t<string>('common:cancel'),
      buttonClear: i18n.t<string>('common:clear'),
    },
    md: 4,
    sx: fieldSx,
  }),
  field({
    name: 'CheckGroupField',
    inputType: 'check-group',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseSelect')),
    componentProps: {
      options: optionsCheck,
    },
    md: 4,
    sx: fieldSx,
  }),
  field({
    name: 'RadioGroupField',
    inputType: 'radio-group',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseSelect')),
    componentProps: {
      options: optionRadio,
    },
    md: 4,
    sx: fieldSx,
  }),
  field({
    name: 'SwithGroupField',
    inputType: 'switch-group',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseSelect')),
    componentProps: {
      options: optionRadio,
    },
    md: 4,
    sx: fieldSx,
  }),
  field({
    name: 'DateMultiField',
    inputType: 'date-multi',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseSelect')),
    lg: 4,
    sx: fieldSx,
    componentProps: {
      placeholder: i18n.t<string>('common:pleaseSelect'),
      buttonOk: i18n.t<string>('common:apply'),
      buttonCancel: i18n.t<string>('common:cancel'),
      buttonClear: i18n.t<string>('common:clear'),
    },
  }),
  field({
    name: 'NumberField',
    inputType: 'number',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseEnter')),
    componentProps: {
      placeholder: i18n.t<string>('common:pleaseEnter'),
    },
    md: 3,
    sx: fieldSx,
  }),
  field({
    name: 'TagInputField',
    inputType: 'text-tags',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseEnter')),
    componentProps: {
      placeholder: i18n.t<string>('common:pleaseEnter'),
    },
    md: 9,
    sx: fieldSx,
  }),
];
export default fields;
