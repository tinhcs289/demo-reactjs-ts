import { field } from '@/components/form';
import type { CheckGroupOption } from '@/components/rhfInputs/RHFCheckGroup';
import type { RadioGroupOption } from '@/components/rhfInputs/RHFRadioGroup';
import type { AutoCompleteOption } from '@/components/rhfInputs/RHFSelect';
import { required } from '@/constants/rhfRules';
import consecutiveNumbers from '@/helpers/arrayHelpers/consecutiveNumbers';
import { i18n } from '@/translation';
import type { SxProps, Theme } from '@mui/material';
import type { FormValues } from './_types';
import { fields as ContactFields } from '@/modules/FormContact';
import withDisplayBySwitch from './hocs/withDisplayBySwitch';
import { ToggledOption } from '@/components/inputs/CommonToggledField';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
const toggledOptions: ToggledOption[] = [
  { value: 'bold', icon: FormatBoldIcon },
  { value: 'italic', icon: FormatItalicIcon },
  { value: 'underlined', icon: FormatUnderlinedIcon },
  { value: 'color', icon: FormatColorFillIcon, disabled: true },
];
export const LABEL = 'Lorem ipsum dolor sit amet';
export const LABEL1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
export const optionsCheck: CheckGroupOption[] = consecutiveNumbers(5, 1).map((i) => ({
  label: `${LABEL1} ${i}`,
  value: `${i}`,
}));
export const optionRadio: RadioGroupOption[] = consecutiveNumbers(5, 1).map((i) => ({
  label: `${LABEL1} ${i}`,
  value: `${i}`,
}));
export const options: AutoCompleteOption[] = consecutiveNumbers(20, 1).map((i) => ({
  label: `lựa chọn ${i}`,
  value: `${i}`,
}));
export const defaultValues: FormValues = {
  TextField: '',
  SelectField: undefined,
  SelectMultiField: undefined,
  RadioField: false,
  CheckField: false,
  SwitchField: false,
  SelectBooleanField: undefined,
  DateField: undefined,
  DateTimeField: undefined,
  TimeField: undefined,
  DateMultiField: undefined,
  DateMultiField2: undefined,
  CheckGroupField: undefined,
  RadioGroupField: undefined,
  SwithGroupField: undefined,
  TagInputField: undefined,
  NumberField: undefined,
};
export const fieldSx: SxProps<Theme> = { p: 1, mb: 2 };
export const fields = [
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
    gridFieldHocs: [withDisplayBySwitch],
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
    name: 'Toggle',
    inputType: 'toggle',
    label: 'Lựa chọn định dạng',
    rules: required(i18n.t<string>('common:pleaseSelect')),
    md: 3,
    sx: fieldSx,
    componentProps: {
      options: toggledOptions,
    },
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
    label: 'Lựa chọn ít nhất 01 trong các mục sau',
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
    label: 'Lựa chọn 01 trong các mục sau',
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
    label: 'Các từ khoá',
    rules: required(i18n.t<string>('common:pleaseEnter')),
    componentProps: {
      placeholder: i18n.t<string>('common:pleaseEnter'),
    },
    md: 9,
    sx: fieldSx,
  }),
  field({
    name: 'Place',
    inputType: 'google-place',
    label: 'Địa điểm',
    rules: required(i18n.t<string>('common:pleaseEnter')),
    componentProps: {
      placeholder: 'Tìm kiếm địa điểm',
    },
    sx: fieldSx,
    md: 6,
  }),
  field({
    name: 'Places',
    inputType: 'google-places',
    label: 'Các địa điểm',
    rules: required(i18n.t<string>('common:pleaseEnter')),
    componentProps: {
      multiple: true,
      placeholder: 'Tìm kiếm địa điểm',
    },
    sx: fieldSx,
    md: 6,
  }),
  field({
    name: 'Contact',
    label: 'Thông tin liên hệ',
    fields: ContactFields,
  }),
];