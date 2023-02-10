import type { FormField } from '@/components/form/FormGridFields';
import { required } from '@/constants/rhfRules';
import { i18n } from '@/translation';
import type { SxProps, Theme } from '@mui/material';
import { LABEL, optionRadio, options, optionsCheck } from './constants';
import type { TFormData } from './_types';

const fieldSx: SxProps<Theme> = { p: 1, mb: 2 }

const fields = [
  {
    name: 'SwitchField',
    inputType: 'switch',
    label: LABEL,
    rules: required(i18n.t('common:pleaseSelect')),
    md: 4,
    sx: fieldSx,
  } as FormField<TFormData, 'switch'>,
  {
    name: 'CheckField',
    inputType: 'check',
    label: LABEL,
    rules: required(i18n.t('common:pleaseSelect')),
    md: 4,
    sx: fieldSx,
  } as FormField<TFormData, 'check'>,
  {
    name: 'RadioField',
    inputType: 'radio',
    label: LABEL,
    md: 4,
    sx: fieldSx,
  } as FormField<TFormData, 'radio'>,
  {
    name: 'TextField',
    inputType: 'text',
    label: LABEL,
    rules: required(i18n.t('common:pleaseEnter')),
    componentProps: {
      placeholder: i18n.t('common:pleaseEnter'),
    },
    md: 3,
    sx: fieldSx,
  } as FormField<TFormData, 'text'>,
  {
    name: 'SelectField',
    inputType: 'select',
    label: LABEL,
    rules: required(i18n.t('common:pleaseSelect')),
    componentProps: {
      placeholder: i18n.t('common:pleaseSelect'),
      options: options,
    },
    md: 3,
    sx: fieldSx,
  } as FormField<TFormData, 'select'>,
  {
    name: 'SelectMultiField',
    inputType: 'select-multi',
    label: LABEL,
    rules: required(i18n.t('common:pleaseSelect')),
    componentProps: {
      placeholder: i18n.t('common:pleaseSelect'),
      options: options,
      multiple: true,
    },
    md: 3,
    sx: fieldSx,
  } as FormField<TFormData, 'select-multi'>,
  {
    name: 'SelectBooleanField',
    inputType: 'select-boolean',
    label: LABEL,
    rules: required(i18n.t('common:pleaseSelect')),
    componentProps: {
      placeholder: i18n.t('common:pleaseSelect'),
      labelTrue: i18n.t('common:yes'),
      labelFalse: i18n.t('common:no'),
    },
    md: 3,
    sx: fieldSx,
  } as FormField<TFormData, 'select-boolean'>,
  {
    name: 'DateField',
    inputType: 'date',
    label: LABEL,
    rules: required(i18n.t('common:pleaseSelect')),
    componentProps: {
      placeholder: i18n.t('common:pleaseSelect'),
    },
    md: 5,
    sx: fieldSx,
  } as FormField<TFormData, 'date'>,
  {
    name: 'DateTimeField',
    inputType: 'date-time',
    label: LABEL,
    rules: required(i18n.t('common:pleaseSelect')),
    componentProps: {
      placeholder: i18n.t('common:pleaseSelect'),
    },
    md: 5,
    sx: fieldSx,
  } as FormField<TFormData, 'date-time'>,
  {
    name: 'TimeField',
    inputType: 'time',
    label: LABEL,
    rules: required(i18n.t('common:pleaseSelect')),
    componentProps: {
      placeholder: i18n.t('common:pleaseSelect'),
    },
    md: 2,
    sx: fieldSx,
  } as FormField<TFormData, 'time'>,
  {
    name: 'CheckGroupField',
    inputType: 'check-group',
    label: LABEL,
    rules: required(i18n.t('common:pleaseSelect')),
    componentProps: {
      options: optionsCheck,
    },
    md: 4,
    sx: fieldSx,
  } as FormField<TFormData, 'check-group'>,
  {
    name: 'RadioGroupField',
    inputType: 'radio-group',
    label: LABEL,
    rules: required(i18n.t('common:pleaseSelect')),
    componentProps: {
      options: optionRadio,
    },
    md: 4,
    sx: fieldSx,
  } as FormField<TFormData, 'radio-group'>,
  {
    name: 'SwithGroupField',
    inputType: 'switch-group',
    label: LABEL,
    rules: required(i18n.t('common:pleaseSelect')),
    componentProps: {
      options: optionRadio,
    },
    md: 4,
    sx: fieldSx,
  } as FormField<TFormData, 'switch-group'>,
  {
    name: 'DateMultiField',
    inputType: 'date-multi-picker',
    label: LABEL,
    rules: required(i18n.t('common:pleaseSelect')),
    lg: 4,
    sx: fieldSx,
  } as FormField<TFormData, 'date-multi-picker'>,
  {
    name: 'DateMultiField2',
    inputType: 'date-multi-picker-tags',
    label: LABEL,
    rules: required(i18n.t('common:pleaseSelect')),
    lg: 8,
    sx: fieldSx,
  } as FormField<TFormData, 'date-multi-picker-tags'>,
  {
    name: 'DateMultiField3',
    inputType: 'date-multi',
    label: LABEL,
    rules: required(i18n.t('common:pleaseSelect')),
    sx: fieldSx,
  } as FormField<TFormData, 'date-multi'>,
  {
    name: 'NumberField',
    inputType: 'number',
    label: LABEL,
    rules: required(i18n.t('common:pleaseEnter')),
    componentProps: {
      placeholder: i18n.t('common:pleaseEnter'),
    },
    md: 3,
    sx: fieldSx,
  } as FormField<TFormData, 'number'>,
  {
    name: 'TagInputField',
    inputType: 'text-tags',
    label: LABEL,
    rules: required(i18n.t('common:pleaseEnter')),
    componentProps: {
      placeholder: i18n.t('common:pleaseEnter'),
    },
    md: 9,
    sx: fieldSx,
  } as FormField<TFormData, 'text-tags'>,

];
export default fields;
