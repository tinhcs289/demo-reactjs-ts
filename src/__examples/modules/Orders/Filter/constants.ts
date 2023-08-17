import { field, withDisplayAsPopper } from '@/components/form';
import { SwitchGroupOption } from '@/components/inputs/CommonSwitchGroupField';
import { CommonTagInputItem } from '@/components/inputs/CommonTagInputField';
import type { ToggledOption } from '@/components/inputs/CommonToggledField';
import type { CheckGroupOption } from '@/components/rhfInputs/RHFCheckGroup';
import type { RadioGroupOption } from '@/components/rhfInputs/RHFRadioGroup';
import type { AutoCompleteOption } from '@/components/rhfInputs/RHFSelect';
import consecutiveNumbers from '@/helpers/arrayHelpers/consecutiveNumbers';
import withQueryUserOptions from './hocs/withQueryUserOptions';
import { i18n } from '@/translation';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import type { SxProps, Theme } from '@mui/material';
import type { Moment } from 'moment';
import moment from 'moment';
import type { FormValues } from './_types';
import withDisplayBySwitch from './hocs/withDisplayBySwitch';
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
  TextField: null,
  SelectField: null,
  SelectMultiField: null,
  RadioField: null,
  CheckField: null,
  SwitchField: null,
  SelectBooleanField: null,
  DateField: null,
  DateTimeField: null,
  Place: null,
  Places: null,
  TimeField: null,
  DateMultiField: null,
  DateMultiField2: null,
  DateMultiField3: null,
  CheckGroupField: null,
  RadioGroupField: null,
  SwithGroupField: null,
  TagInputField: null,
  NumberField: null,
  Toggle: null,
  Toggle2: null,
};
export const fieldSx: SxProps<Theme> = { p: '4px' };
/**
 * @note fields must match exactly with the type of `FormValues`
 */
export const fields = [
  field({
    name: 'SwitchField',
    inputType: 'switch',
    label: LABEL,
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<'switch'>({
        toggleButtonLabel: 'SwitchField',
        getLabelText: (value: boolean) =>
          typeof value !== 'boolean' ? 'SwitchField' : `SwitchField: ${value === true ? 'Yes' : 'No'}`,
      }),
    ],
  }),
  field({
    name: 'CheckField',
    inputType: 'check',
    label: LABEL,
    disabledXs: true,
    gridFieldHocs: [withDisplayBySwitch],
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<'check'>({
        toggleButtonLabel: 'CheckField',
        getLabelText: (value: boolean) =>
          typeof value !== 'boolean' ? 'CheckField' : `CheckField: ${value === true ? 'Yes' : 'No'}`,
      }),
    ],
  }),
  field({
    name: 'RadioField',
    inputType: 'radio',
    label: LABEL,
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<'radio'>({
        toggleButtonLabel: 'RadioField',
        getLabelText: (value: boolean) =>
          typeof value !== 'boolean' ? 'RadioField' : `RadioField: ${value === true ? 'Yes' : 'No'}`,
      }),
    ],
  }),
  field({
    name: 'Toggle2',
    inputType: 'toggle',
    label: 'Các ngày trong tuần',
    disabledXs: true,
    sx: fieldSx,
    componentProps: {
      fullWidth: true,
      multiple: true,
      options: [
        { value: 'MON', label: 'T2' },
        { value: 'TUE', label: 'T3' },
        { value: 'WED', label: 'T4' },
        { value: 'THU', label: 'T5' },
        { value: 'FRI', label: 'T6' },
        { value: 'SAT', label: 'T7' },
        { value: 'SUN', label: 'CN' },
      ],
    },
    hocs: [
      withDisplayAsPopper<'toggle'>({
        toggleButtonLabel: 'Toggle2',
        getLabelText: (value: ToggledOption[]) =>
          !(value instanceof Array && value.length > 0)
            ? 'Toggle2'
            : `Toggle2: ${value.map((o) => o.label).join(', ')}`,
      }),
    ],
  }),
  field({
    name: 'Toggle',
    inputType: 'toggle',
    label: 'Lựa chọn định dạng',
    disabledXs: true,
    sx: fieldSx,
    componentProps: {
      fullWidth: true,
      options: [
        { value: 'bold', label: 'Đậm', startIcon: FormatBoldIcon },
        { value: 'italic', label: 'Nghiêng', startIcon: FormatItalicIcon },
        { value: 'underlined', label: 'Gạch dưới', startIcon: FormatUnderlinedIcon },
        { value: 'color', icon: FormatColorFillIcon, disabled: true },
      ],
    },
    hocs: [
      withDisplayAsPopper<'toggle'>({
        toggleButtonLabel: 'Toggle',
        getLabelText: (value: ToggledOption) => (!value ? 'Toggle' : `Toggle: ${value.label}`),
      }),
    ],
  }),
  field({
    name: 'TextField',
    inputType: 'text',
    label: LABEL,
    componentProps: {
      placeholder: i18n.t('common:pleaseEnter'),
    },
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<'text'>({
        toggleButtonLabel: 'TextField',
        getLabelText: (value: string) => (!value ? 'TextField' : `TextField: ${value}`),
      }),
    ],
  }),
  field({
    name: 'SelectField',
    inputType: 'select',
    label: LABEL,
    componentProps: {
      placeholder: i18n.t('common:pleaseSelect'),
    },
    hocs: [
      withDisplayAsPopper<'select'>({
        toggleButtonLabel: 'SelectField',
        getLabelText: (value: AutoCompleteOption) => (!value ? 'SelectField' : `SelectField: ${value.label}`),
      }),
      withQueryUserOptions,
    ],
    disabledXs: true,
    sx: fieldSx,
  }),
  field({
    name: 'SelectMultiField',
    inputType: 'select-multi',
    label: LABEL,
    componentProps: {
      placeholder: i18n.t('common:pleaseSelect'),
      options: options,
      multiple: true,
    },
    hocs: [
      withDisplayAsPopper<'select-multi'>({
        toggleButtonLabel: 'SelectField',
        getLabelText: (value: AutoCompleteOption[]) =>
          !(value instanceof Array && value.length > 0)
            ? 'SelectMultiField'
            : `SelectMultiField: ${value.map((o) => o.label).join(', ')}`,
      }),
    ],
    disabledXs: true,
    sx: fieldSx,
  }),
  field({
    name: 'SelectBooleanField',
    inputType: 'select-boolean',
    label: LABEL,
    componentProps: {
      placeholder: i18n.t('common:pleaseSelect'),
      labelTrue: i18n.t('common:yes'),
      labelFalse: i18n.t('common:no'),
    },
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<'select-boolean'>({
        toggleButtonLabel: 'SelectBooleanField',
        getLabelText: (value: boolean) =>
          typeof value !== 'boolean'
            ? 'SelectBooleanField'
            : `SelectBooleanField: ${value === true ? 'Yes' : 'No'}`,
      }),
    ],
  }),
  field({
    name: 'DateField',
    inputType: 'date',
    label: LABEL,
    componentProps: {
      placeholder: i18n.t('common:pleaseSelect'),
      buttonOk: i18n.t('common:apply'),
      ButtonNegative: i18n.t('common:cancel'),
      buttonClear: i18n.t('common:clear'),
    },
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<'date'>({
        toggleButtonLabel: 'DateField',
        getLabelText: (value: Moment) =>
          !value || !moment.isMoment(value) ? 'DateField' : `DateField: ${value.format('DD/MM/YYYY')}`,
      }),
    ],
  }),
  field({
    name: 'DateTimeField',
    inputType: 'date-time',
    label: LABEL,
    componentProps: {
      placeholder: i18n.t('common:pleaseSelect'),
      buttonOk: i18n.t('common:apply'),
      ButtonNegative: i18n.t('common:cancel'),
      buttonClear: i18n.t('common:clear'),
    },
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<'date-time'>({
        toggleButtonLabel: 'DateField',
        getLabelText: (value: Moment) =>
          !value || !moment.isMoment(value) ? 'DateField' : `DateField: ${value.format('DD/MM/YYYY')}`,
      }),
    ],
  }),
  field({
    name: 'TimeField',
    inputType: 'time',
    label: LABEL,
    componentProps: {
      placeholder: i18n.t('common:pleaseSelect'),
      buttonOk: i18n.t('common:apply'),
      ButtonNegative: i18n.t('common:cancel'),
      buttonClear: i18n.t('common:clear'),
    },
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<'time'>({
        toggleButtonLabel: 'TimeField',
        getLabelText: (value: Moment) =>
          !value || !moment.isMoment(value) ? 'TimeField' : `TimeField: ${value.format('HH:mm')}`,
      }),
    ],
  }),
  field({
    name: 'CheckGroupField',
    inputType: 'check-group',
    label: 'Lựa chọn ít nhất 01 trong các mục sau',
    componentProps: {
      options: optionsCheck,
    },
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<'check-group'>({
        toggleButtonLabel: 'CheckGroupField',
        getLabelText: (value: CheckGroupOption[]) =>
          !(value instanceof Array && value.length > 0)
            ? 'CheckGroupField'
            : `CheckGroupField: ${value.map((o) => o.label).join(', ')}`,
      }),
    ],
  }),
  field({
    name: 'RadioGroupField',
    inputType: 'radio-group',
    label: 'Lựa chọn 01 trong các mục sau',
    componentProps: {
      options: optionRadio,
    },
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<'radio-group'>({
        toggleButtonLabel: 'RadioGroupField',
        getLabelText: (value: RadioGroupOption) => (!value ? 'SelectField' : `SelectField: ${value.label}`),
      }),
    ],
  }),
  field({
    name: 'SwithGroupField',
    inputType: 'switch-group',
    label: LABEL,
    componentProps: {
      options: optionRadio,
    },
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<'switch-group'>({
        toggleButtonLabel: 'SwithGroupField',
        getLabelText: (value: SwitchGroupOption[]) =>
          !(value instanceof Array && value.length > 0)
            ? 'SwithGroupField'
            : `SwithGroupField: ${value.map((o) => o.label).join(', ')}`,
      }),
    ],
  }),
  field({
    name: 'DateMultiField',
    inputType: 'date-multi',
    label: LABEL,
    disabledXs: true,
    sx: fieldSx,
    componentProps: {
      placeholder: i18n.t('common:pleaseSelect'),
      buttonOk: i18n.t('common:apply'),
      ButtonNegative: i18n.t('common:cancel'),
      buttonClear: i18n.t('common:clear'),
    },
    hocs: [
      withDisplayAsPopper<'date-multi'>({
        toggleButtonLabel: 'DateMultiField',
        getLabelText: (value: Moment[]) =>
          !(value instanceof Array && value.length > 0)
            ? 'DateMultiField'
            : `DateMultiField: ${value.map((d) => d.format('DD/MM/YYYY')).join(', ')}`,
      }),
    ],
  }),
  field({
    name: 'NumberField',
    inputType: 'number',
    label: LABEL,
    componentProps: {
      placeholder: i18n.t('common:pleaseEnter'),
    },
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<'number'>({
        toggleButtonLabel: 'NumberField',
        getLabelText: (value: number) => (!value ? 'NumberField' : `NumberField: ${value}`),
      }),
    ],
  }),
  field({
    name: 'TagInputField',
    inputType: 'text-tags',
    label: 'Các từ khoá',
    componentProps: {
      placeholder: i18n.t('common:pleaseEnter'),
    },
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<'text-tags'>({
        toggleButtonLabel: 'TagInputField',
        getLabelText: (value: CommonTagInputItem[]) =>
          !(value instanceof Array && value.length > 0)
            ? 'TagInputField'
            : `TagInputField: ${value.map((o) => o.label).join(', ')}`,
      }),
    ],
  }),
  field({
    name: 'Place',
    inputType: 'google-place',
    label: 'Địa điểm',
    componentProps: {
      placeholder: 'Tìm kiếm địa điểm',
    },
    sx: fieldSx,
    disabledXs: true,
    hocs: [
      withDisplayAsPopper<'google-place'>({
        toggleButtonLabel: 'Place',
        getLabelText: (value: AutoCompleteOption) => (!value ? 'Place' : `Place: ${value.label}`),
      }),
    ],
  }),
  field({
    name: 'Places',
    inputType: 'google-places',
    label: 'Các địa điểm',
    componentProps: {
      multiple: true,
      placeholder: 'Tìm kiếm địa điểm',
    },
    sx: fieldSx,
    disabledXs: true,
    hocs: [
      withDisplayAsPopper<'google-place'>({
        toggleButtonLabel: 'Place',
        getLabelText: (value: AutoCompleteOption[]) =>
          !(value instanceof Array && value.length > 0)
            ? 'Place'
            : `Place: ${value.map((o) => o.label).join(', ')}`,
      }),
    ],
  }),
];
