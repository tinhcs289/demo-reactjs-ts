import { field, fieldArray, formItemSx } from '@/components/form';
import type { CheckGroupOption } from '@/components/rhfInputs/RHFCheckGroup';
import type { RadioGroupOption } from '@/components/rhfInputs/RHFRadioGroup';
import type { AutoCompleteOption } from '@/components/rhfInputs/RHFSelect';
import { maxLength, minLength, required } from '@/constants/rhfRules';
import consecutiveNumbers from '@/helpers/arrayHelpers/consecutiveNumbers';
import { contactFields } from '@/modules/FormContact';
import { i18n } from '@/translation';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import type { SxProps, Theme } from '@mui/material';
import type { FormValues } from './_types';
import withAddContactButton from './hocs/withAddContactButton';
import withDisplayBySwitch from './hocs/withDisplayBySwitch';
import ContactArrayItemForm from './components/ContactArrayItemForm';
import withQueryUserOptions from '@/modules/FormDemo/hocs/withQueryUserOptions';
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
  // field({
  //   name: 'SwitchField',
  //   inputType: 'switch',
  //   label: LABEL,
  //   rules: required(i18n.t<string>('common:pleaseSelect')),
  //   md: 4,
  //   sx: fieldSx,
  // }),
  // field({
  //   name: 'CheckField',
  //   inputType: 'check',
  //   label: LABEL,
  //   rules: required(i18n.t<string>('common:pleaseSelect')),
  //   md: 4,
  //   gridFieldHocs: [withDisplayBySwitch],
  //   sx: fieldSx,
  // }),
  // field({
  //   name: 'RadioField',
  //   inputType: 'radio',
  //   label: LABEL,
  //   md: 4,
  //   sx: fieldSx,
  // }),
  // field({
  //   name: 'Toggle2',
  //   inputType: 'toggle',
  //   label: 'Các ngày trong tuần',
  //   md: 3,
  //   sx: fieldSx,
  //   componentProps: {
  //     fullWidth: true,
  //     multiple: true,
  //     options: [
  //       { value: 'MON', label: 'T2' },
  //       { value: 'TUE', label: 'T3' },
  //       { value: 'WED', label: 'T4' },
  //       { value: 'THU', label: 'T5' },
  //       { value: 'FRI', label: 'T6' },
  //       { value: 'SAT', label: 'T7' },
  //       { value: 'SUN', label: 'CN' },
  //     ],
  //   },
  // }),
  // field({
  //   name: 'Toggle',
  //   inputType: 'toggle',
  //   label: 'Lựa chọn định dạng',
  //   rules: required(i18n.t<string>('common:pleaseSelect')),
  //   md: 3,
  //   sx: fieldSx,
  //   componentProps: {
  //     fullWidth: true,
  //     options: [
  //       { value: 'bold', label: 'Đậm', startIcon: FormatBoldIcon },
  //       { value: 'italic', label: 'Nghiêng', startIcon: FormatItalicIcon },
  //       { value: 'underlined', label: 'Gạch dưới', startIcon: FormatUnderlinedIcon },
  //       { value: 'color', icon: FormatColorFillIcon, disabled: true },
  //     ],
  //   },
  // }),
  // field({
  //   name: 'TextField',
  //   inputType: 'text',
  //   label: LABEL,
  //   rules: required(i18n.t<string>('common:pleaseEnter')),
  //   componentProps: {
  //     placeholder: i18n.t<string>('common:pleaseEnter'),
  //   },
  //   md: 3,
  //   sx: fieldSx,
  // }),
  field({
    name: 'SelectField',
    inputType: 'select',
    label: LABEL,
    rules: required(i18n.t<string>('common:pleaseSelect')),
    componentProps: {
      placeholder: i18n.t<string>('common:pleaseSelect'),
      //options: options,
    },
    hocs: [withQueryUserOptions],
    md: 3,
    sx: fieldSx,
  }),
  // field({
  //   name: 'SelectMultiField',
  //   inputType: 'select-multi',
  //   label: LABEL,
  //   rules: required(i18n.t<string>('common:pleaseSelect')),
  //   componentProps: {
  //     placeholder: i18n.t<string>('common:pleaseSelect'),
  //     options: options,
  //     multiple: true,
  //   },
  //   md: 3,
  //   sx: fieldSx,
  // }),
  // field({
  //   name: 'SelectBooleanField',
  //   inputType: 'select-boolean',
  //   label: LABEL,
  //   rules: required(i18n.t<string>('common:pleaseSelect')),
  //   componentProps: {
  //     placeholder: i18n.t<string>('common:pleaseSelect'),
  //     labelTrue: i18n.t<string>('common:yes'),
  //     labelFalse: i18n.t<string>('common:no'),
  //   },
  //   md: 3,
  //   sx: fieldSx,
  // }),
  // field({
  //   name: 'DateField',
  //   inputType: 'date',
  //   label: LABEL,
  //   rules: required(i18n.t<string>('common:pleaseSelect')),
  //   componentProps: {
  //     placeholder: i18n.t<string>('common:pleaseSelect'),
  //     buttonOk: i18n.t<string>('common:apply'),
  //     buttonCancel: i18n.t<string>('common:cancel'),
  //     buttonClear: i18n.t<string>('common:clear'),
  //   },
  //   md: 4,
  //   sx: fieldSx,
  // }),
  // field({
  //   name: 'DateTimeField',
  //   inputType: 'date-time',
  //   label: LABEL,
  //   rules: required(i18n.t<string>('common:pleaseSelect')),
  //   componentProps: {
  //     placeholder: i18n.t<string>('common:pleaseSelect'),
  //     buttonOk: i18n.t<string>('common:apply'),
  //     buttonCancel: i18n.t<string>('common:cancel'),
  //     buttonClear: i18n.t<string>('common:clear'),
  //   },
  //   md: 4,
  //   sx: fieldSx,
  // }),
  // field({
  //   name: 'TimeField',
  //   inputType: 'time',
  //   label: LABEL,
  //   rules: required(i18n.t<string>('common:pleaseSelect')),
  //   componentProps: {
  //     placeholder: i18n.t<string>('common:pleaseSelect'),
  //     buttonOk: i18n.t<string>('common:apply'),
  //     buttonCancel: i18n.t<string>('common:cancel'),
  //     buttonClear: i18n.t<string>('common:clear'),
  //   },
  //   md: 4,
  //   sx: fieldSx,
  // }),
  // field({
  //   name: 'CheckGroupField',
  //   inputType: 'check-group',
  //   label: 'Lựa chọn ít nhất 01 trong các mục sau',
  //   rules: required(i18n.t<string>('common:pleaseSelect')),
  //   componentProps: {
  //     options: optionsCheck,
  //   },
  //   md: 4,
  //   sx: fieldSx,
  // }),
  // field({
  //   name: 'RadioGroupField',
  //   inputType: 'radio-group',
  //   label: 'Lựa chọn 01 trong các mục sau',
  //   rules: required(i18n.t<string>('common:pleaseSelect')),
  //   componentProps: {
  //     options: optionRadio,
  //   },
  //   md: 4,
  //   sx: fieldSx,
  // }),
  // field({
  //   name: 'SwithGroupField',
  //   inputType: 'switch-group',
  //   label: LABEL,
  //   rules: required(i18n.t<string>('common:pleaseSelect')),
  //   componentProps: {
  //     options: optionRadio,
  //   },
  //   md: 4,
  //   sx: fieldSx,
  // }),
  // field({
  //   name: 'DateMultiField',
  //   inputType: 'date-multi',
  //   label: LABEL,
  //   rules: required(i18n.t<string>('common:pleaseSelect')),
  //   lg: 4,
  //   sx: fieldSx,
  //   componentProps: {
  //     placeholder: i18n.t<string>('common:pleaseSelect'),
  //     buttonOk: i18n.t<string>('common:apply'),
  //     buttonCancel: i18n.t<string>('common:cancel'),
  //     buttonClear: i18n.t<string>('common:clear'),
  //   },
  // }),
  // field({
  //   name: 'NumberField',
  //   inputType: 'number',
  //   label: LABEL,
  //   rules: required(i18n.t<string>('common:pleaseEnter')),
  //   componentProps: {
  //     placeholder: i18n.t<string>('common:pleaseEnter'),
  //   },
  //   md: 3,
  //   sx: fieldSx,
  // }),
  // field({
  //   name: 'TagInputField',
  //   inputType: 'text-tags',
  //   label: 'Các từ khoá',
  //   rules: required(i18n.t<string>('common:pleaseEnter')),
  //   componentProps: {
  //     placeholder: i18n.t<string>('common:pleaseEnter'),
  //   },
  //   md: 9,
  //   sx: fieldSx,
  // }),
  // field({
  //   name: 'Place',
  //   inputType: 'google-place',
  //   label: 'Địa điểm',
  //   rules: required(i18n.t<string>('common:pleaseEnter')),
  //   componentProps: {
  //     placeholder: 'Tìm kiếm địa điểm',
  //   },
  //   sx: fieldSx,
  //   md: 6,
  // }),
  // field({
  //   name: 'Places',
  //   inputType: 'google-places',
  //   label: 'Các địa điểm',
  //   rules: required(i18n.t<string>('common:pleaseEnter')),
  //   componentProps: {
  //     multiple: true,
  //     placeholder: 'Tìm kiếm địa điểm',
  //   },
  //   sx: fieldSx,
  //   md: 6,
  // }),
  // field({
  //   name: 'Contact',
  //   fields: contactFields,
  // }),
  // fieldArray({
  //   name: 'Contacts2',
  //   fields: contactFields,
  //   gridFieldHocs: [withAddContactButton],
  //   sx: formItemSx,
  //   rules: {
  //     ...required('Dữ liệu bắt buộc'),
  //     ...minLength(2, 'tối thiểu 2 bản ghi'),
  //     ...maxLength(4, 'tối đa 4 bản ghi'),
  //   },
  // }),
  // fieldArray({
  //   name: 'Contacts',
  //   fields: contactFields,
  //   gridFieldHocs: [withAddContactButton],
  //   itemComponent: ContactArrayItemForm,
  //   sx: formItemSx,
  //   rules: {
  //     validate: {
  //       fieldIsRequired: (value: any[]) => {
  //         if (!value) return 'Dữ liệu bắt buộc';
  //         if (!(value instanceof Array)) return 'Dữ liệu bắt buộc';
  //         if (value.length === 0) return 'Dữ liệu bắt buộc';
  //         return true;
  //       },
  //       minimumTotalOfItemsIs2: (value: any[]) => {
  //         if (!value) return true;
  //         if (!(value instanceof Array)) return true;
  //         if (value.length >= 2) return true;
  //         return 'tối thiểu 2 bản ghi';
  //       },
  //       maximumTotalOfItemsIs4: (value: any[]) => {
  //         if (!value) return true;
  //         if (!(value instanceof Array)) return true;
  //         if (value.length <= 3) return true;
  //         return 'tối đa 4 bản ghi';
  //       },
  //     },
  //   },
  // }),
];
