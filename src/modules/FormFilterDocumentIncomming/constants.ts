import { field, withDisplayAsPopper } from '@/components/form';
import toDateRangeText from '@/helpers/formatHelpers/toDateRangeText';
import { i18n } from '@/translation';
import type { SxProps, Theme } from '@mui/material';
import moment from 'moment';
import type { FormValues } from './_types';
import { DOCUMENT_STATUS } from '@/constants/document';
import withMinOrMaxDateByAnotherDate from './hocs/withMinOrMaxDateByAnotherDate';
import { CheckGroupOption } from '@/components/rhfInputs/RHFCheckGroup';
const statusOptions = Object.keys(DOCUMENT_STATUS).map(
  (k) =>
    ({
      value: (DOCUMENT_STATUS as any)[k].value,
      label: (DOCUMENT_STATUS as any)[k].text,
    }) as CheckGroupOption
);
export const defaultValues: FormValues = {
  Keyword: null,
  DateReceived: {
    From: null,
    To: null,
  },
  DateProcess: {
    From: null,
    To: null,
  },
  Status: null,
};
export const fieldSx: SxProps<Theme> = { p: '4px' };
/**
 * @note fields must match exactly with the type of `FormValues`
 */
export const fields = [
  field({
    name: 'Keyword',
    inputType: 'text',
    componentProps: {
      placeholder: i18n.t('common:pleaseEnter'),
    },
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<'text'>({
        toggleButtonLabel: 'Từ khóa',
        getLabelText: (value: string) => (!value ? 'Từ khóa' : `Từ khóa: ${value}`),
      }),
    ],
  }),
  field({
    name: 'DateReceived',
    fields: [
      field({
        name: 'From',
        inputType: 'date',
        label: 'Từ',
        componentProps: {
          placeholder: i18n.t('common:pleaseSelect'),
          clearText: 'Xóa',
        },
        sx: { ...fieldSx, mb: 2 },
      }),
      field({
        name: 'To',
        inputType: 'date',
        label: 'Đến',
        componentProps: {
          placeholder: i18n.t('common:pleaseSelect'),
          clearText: 'Xóa',
        },
        hocs: [withMinOrMaxDateByAnotherDate('minDate', 'DateReceived.From')] as any,
        sx: fieldSx,
      }),
    ],
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<any>({
        namePrefix: 'DateReceived',
        toggleButtonLabel: 'Ngày nhận',
        hasValueWhen: (value: FormValues['DateReceived']) =>
          (!!value?.From && moment.isMoment(value.From)) || (!!value?.To && moment.isMoment(value.To)),
        getLabelText: (value: FormValues['DateReceived']) =>
          toDateRangeText(
            value?.From,
            value?.To
          )({
            format: 'DD/MM/YYYY',
            hasFromAndTo: (f, t) => `Ngày nhận: ${f} đến ${t}`,
            hasOnlyFrom: (f) => `Ngày nhận từ ${f} trở về sau`,
            hasOnlyTo: (t) => `Ngày nhận từ trước đến ${t}`,
          }) || 'Ngày nhận',
      }),
    ],
  }),
  field({
    name: 'DateProcess',
    fields: [
      field({
        name: 'From',
        inputType: 'date',
        label: 'Từ',
        componentProps: {
          placeholder: i18n.t('common:pleaseSelect'),
          clearText: 'Xóa',
        },
        sx: { ...fieldSx, mb: 2 },
      }),
      field({
        name: 'To',
        inputType: 'date',
        label: 'Đến',
        componentProps: {
          placeholder: i18n.t('common:pleaseSelect'),
          clearText: 'Xóa',
        },
        hocs: [withMinOrMaxDateByAnotherDate('minDate', 'DateProcess.From')] as any,
        sx: fieldSx,
      }),
    ],
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<any>({
        namePrefix: 'DateProcess',
        toggleButtonLabel: 'Ngày xử lý',
        hasValueWhen: (value: FormValues['DateProcess']) =>
          (!!value?.From && moment.isMoment(value.From)) || (!!value?.To && moment.isMoment(value.To)),
        getLabelText: (value: FormValues['DateProcess']) =>
          toDateRangeText(
            value?.From,
            value?.To
          )({
            format: 'DD/MM/YYYY',
            hasFromAndTo: (f, t) => `Ngày xử lý: ${f} đến ${t}`,
            hasOnlyFrom: (f) => `Ngày xử lý từ ${f} trở về sau`,
            hasOnlyTo: (t) => `Ngày xử lý từ trước đến ${t}`,
          }) || 'Ngày xử lý',
      }),
    ],
  }),
  field({
    name: 'Status',
    inputType: 'check-group',
    disabledXs: true,
    sx: fieldSx,
    componentProps: {
      options: statusOptions,
    },
    hocs: [
      withDisplayAsPopper<'check-group'>({
        toggleButtonLabel: 'Trạng thái',
        hasValueWhen: (value: FormValues['Status']) => Array.isArray(value) && value.length > 0,
        getLabelText: (value: FormValues['Status']) =>
          Array.isArray(value) && value.length > 0
            ? `Trạng thái: ${value.map((status) => status.label).join(', ')}`
            : 'Trạng thái',
      }),
    ],
  }),
];
