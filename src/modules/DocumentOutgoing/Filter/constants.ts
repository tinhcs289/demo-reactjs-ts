import { field, withDisplayAsPopper } from '@/components/form';
import { CheckGroupOption } from '@/components/rhfInputs/RHFCheckGroup';
import toDateRangeText from '@/helpers/formatHelpers/toDateRangeText';
import { DOCUMENT_STATUS } from '@/modules/DocumentIncoming/constants';
import { i18n } from '@/translation';
import type { SxProps, Theme } from '@mui/material';
import moment from 'moment';
import type { FormValues } from './_types';
import withMinOrMaxDateByAnotherDate from './hocs/withMinOrMaxDateByAnotherDate';
import isToday from '@/helpers/commonHelpers/isToDay';
export const statusOptions = Object.keys(DOCUMENT_STATUS).map(
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
  DatePublish: {
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
        inputType: 'date-static',
        label: 'Từ',
        componentProps: {
          placeholder: i18n.t('common:pleaseSelect'),
          clearable: true,
        },
        md: 6,
        sx: { ...fieldSx, mb: 2 },
      }),
      field({
        name: 'To',
        inputType: 'date-static',
        label: 'Đến',
        componentProps: {
          placeholder: i18n.t('common:pleaseSelect'),
          clearable: true,
        },
        md: 6,
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
            dateText: (m) => `${isToday(m) ? 'Hôm nay' : m.format('DD/MM/YYYY')}`,
          }) || 'Ngày nhận',
      }),
    ],
  }),
  field({
    name: 'DateProcess',
    fields: [
      field({
        name: 'From',
        inputType: 'date-static',
        label: 'Từ',
        componentProps: {
          placeholder: i18n.t('common:pleaseSelect'),
          clearable: true,
        },
        sx: { ...fieldSx, mb: 2 },
      }),
      field({
        name: 'To',
        inputType: 'date-static',
        label: 'Đến',
        componentProps: {
          placeholder: i18n.t('common:pleaseSelect'),
          clearable: true,
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
        toggleButtonLabel: 'Hạn xử lý',
        hasValueWhen: (value: FormValues['DateProcess']) =>
          (!!value?.From && moment.isMoment(value.From)) || (!!value?.To && moment.isMoment(value.To)),
        getLabelText: (value: FormValues['DateProcess']) =>
          toDateRangeText(
            value?.From,
            value?.To
          )({
            format: 'DD/MM/YYYY',
            hasFromAndTo: (f, t) => `Hạn xử lý: ${f} đến ${t}`,
            hasOnlyFrom: (f) => `Hạn xử lý từ ${f} trở về sau`,
            hasOnlyTo: (t) => `Hạn xử lý từ trước đến ${t}`,
          }) || 'Hạn xử lý',
      }),
    ],
  }),
  field({
    name: 'DatePublish',
    fields: [
      field({
        name: 'From',
        inputType: 'date-static',
        label: 'Từ',
        componentProps: {
          placeholder: i18n.t('common:pleaseSelect'),
          clearable: true,
        },
        sx: { ...fieldSx, mb: 2 },
      }),
      field({
        name: 'To',
        inputType: 'date-static',
        label: 'Đến',
        componentProps: {
          placeholder: i18n.t('common:pleaseSelect'),
          clearable: true,
        },
        hocs: [withMinOrMaxDateByAnotherDate('minDate', 'DatePublish.From')] as any,
        sx: fieldSx,
      }),
    ],
    disabledXs: true,
    sx: fieldSx,
    hocs: [
      withDisplayAsPopper<any>({
        namePrefix: 'DatePublish',
        toggleButtonLabel: 'Ngày ban hành',
        hasValueWhen: (value: FormValues['DatePublish']) =>
          (!!value?.From && moment.isMoment(value.From)) || (!!value?.To && moment.isMoment(value.To)),
        getLabelText: (value: FormValues['DatePublish']) =>
          toDateRangeText(
            value?.From,
            value?.To
          )({
            format: 'DD/MM/YYYY',
            hasFromAndTo: (f, t) => `Ngày ban hành: ${f} đến ${t}`,
            hasOnlyFrom: (f) => `Ngày ban hành từ ${f} trở về sau`,
            hasOnlyTo: (t) => `Ngày ban hành từ trước đến ${t}`,
          }) || 'Ngày ban hành',
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
