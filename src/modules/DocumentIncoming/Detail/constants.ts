import { field, fieldArray, fieldGroup, formItemSx, withFieldGroupLabel } from '@/components/form';
import { required } from '@/constants/rhfRules';
import { i18n } from '@/translation';
import type { FileData } from '@/types';
import { MUTATE_ACTION as ACTION } from '../constants';
import type { FormValues } from './_types';
import AttachmentFile from './components/AttachmentFile';
import withQueryDocumentBooks from './hocs/withQueryDocumentBooks';
import withQueryDocumentTypes from './hocs/withQueryDocumentTypes';
import withQueryReceivedTypes from './hocs/withQueryReceivedTypes';
import withQueryUnitExternal from './hocs/withQueryUnitExternal';
import withQueryUrgencyDegrees from './hocs/withQueryUrgencyDegrees';
import withUploadFileButton from './hocs/withUploadFileButton';
import withQueryUnitExternalTransition from './hocs/withQueryUnitExternalTransition';
import withDisplayUnitExternalBySentFromType from './hocs/withDisplayUnitExternalBySentFromType';
import withDisplayUnitInternalBySentFromType from './hocs/withDisplayUnitInternalBySentFromType';
import withQueryUnitInternal from './hocs/withQueryUnitInternal';
import withDisplayUnitExternalTransitionBySentFromType from './hocs/withDisplayUnitExternalTransitionBySentFromType';
export const defaultValues: FormValues = {
  Id: -1,
};
export const MUTATE_ACTION = { ...ACTION };
export const fields = [
  fieldGroup({
    hocs: [withFieldGroupLabel('Thông tin')],
    fields: [
      field({
        name: 'DocumentBook',
        inputType: 'select',
        label: i18n.t('document:book'),
        //rules: required(i18n.t('common:pleaseSelect')),
        sx: formItemSx,
        hocs: [withQueryDocumentBooks],
        md: 8,
        lg: 4,
      }),
      field({
        name: 'NumberInIssueBook',
        inputType: 'number',
        label: i18n.t('document:numberIn'),
        rules: required(i18n.t('common:pleaseEnter')),
        sx: formItemSx,
        md: 2,
        lg: 1,
      }),
      field({
        name: 'NumberSub',
        inputType: 'number',
        label: i18n.t('document:numberSub'),
        sx: formItemSx,
        md: 2,
        lg: 1,
      }),
      field({
        name: 'DocumentType',
        inputType: 'select',
        label: i18n.t('document:type'),
        rules: required(i18n.t('common:pleaseSelect')),
        sx: formItemSx,
        hocs: [withQueryDocumentTypes],
        md: 6,
        lg: 4,
      }),
      field({
        name: 'DocumentNotation',
        inputType: 'text',
        label: i18n.t('document:notation'),
        sx: formItemSx,
        md: 6,
        lg: 2,
      }),

      field({
        name: 'UrgencyDegree',
        inputType: 'select',
        label: i18n.t('document:urgencyDegree'),
        sx: formItemSx,
        hocs: [withQueryUrgencyDegrees],
        md: 6,
        lg: 2,
      }),
      field({
        name: 'ReceivedType',
        inputType: 'select',
        label: i18n.t('document:receivedType'),
        rules: required(i18n.t('common:pleaseSelect')),
        sx: formItemSx,
        hocs: [withQueryReceivedTypes],
        md: 6,
        lg: 2,
      }),
      field({
        name: 'TotalOfCopies',
        inputType: 'number',
        label: i18n.t('document:totalOfCopies'),
        sx: formItemSx,
        md: 6,
        lg: 2,
      }),
      field({
        name: 'TotalOfDocumentPages',
        inputType: 'number',
        label: i18n.t('document:totalOfPages'),
        sx: formItemSx,
        md: 6,
        lg: 2,
      }),
      field({
        name: 'Signer',
        inputType: 'text',
        label: i18n.t('document:signer'),
        sx: formItemSx,
        md: 6,
        lg: 3,
      }),
      field({
        name: 'DatePublish',
        inputType: 'date',
        label: i18n.t('document:datePublish'),
        sx: formItemSx,
        componentProps: {
          placeholder: 'DD/MM/YYYY',
        },
        md: 6,
        lg: 3,
      }),
      field({
        name: 'DateIncomming',
        inputType: 'date',
        label: i18n.t('document:dateIncomming'),
        rules: required(i18n.t('common:pleaseSelect')),
        sx: formItemSx,
        componentProps: {
          placeholder: 'DD/MM/YYYY',
        },
        md: 6,
        lg: 3,
      }),
      field({
        name: 'DateProcessDeadline',
        inputType: 'date',
        label: i18n.t('document:dateProcessDeadline'),
        sx: formItemSx,
        componentProps: {
          placeholder: 'DD/MM/YYYY',
        },
        md: 6,
        lg: 3,
      }),
      field({
        name: 'DateReceivedPaperCopy',
        inputType: 'date',
        label: i18n.t('document:dateReceivedPaperCopy'),
        md: 6,
        lg: 3,
        componentProps: {
          placeholder: 'DD/MM/YYYY',
        },
        sx: formItemSx,
      }),
      field({
        name: 'IsLegalDocument',
        inputType: 'check',
        label: i18n.t('document:isLegalDocument'),
        sx: formItemSx,
        contentProps: { sx: { mt: '8px' } },
        lg: 2,
      }),
      field({
        name: 'IsRequestReply',
        inputType: 'check',
        label: i18n.t('document:isRequestReply'),
        sx: formItemSx,
        contentProps: { sx: { mt: '8px' } },
        lg: 2,
      }),
      field({
        name: 'HaveReceivedPaperCopy',
        inputType: 'check',
        label: i18n.t('document:haveReceivedPaperCopy'),
        sx: formItemSx,
        contentProps: { sx: { mt: '8px' } },
        lg: 2,
      }),
    ],
  }),
  fieldGroup({
    hocs: [withFieldGroupLabel('Nởi gửi')],
    fields: [
      field({
        name: 'SentFromType',
        inputType: 'radio-group',
        label: 'Loại nơi gửi',
        sx: formItemSx,
        componentProps: {
          groupProps: {
            row: true,
            sx: {
              alignItems: 'baseline',
              width: '100%',
              '& .MuiFormControlLabel-root': {
                flex: 1,
              },
            },
          },
          options: [
            { label: 'Trong hệ thống', value: 'INTERNAL' },
            { label: 'Đơn vị liên thông', value: 'EXTERNAL_TRANSITION' },
            { label: 'Ngoài hệ thống', value: 'EXTERNAL' },
          ],
        },
      }),
      field({
        name: 'SentFromExternal',
        inputType: 'select',
        label: 'Nơi gửi ngoài hệ thống',
        sx: formItemSx,
        hocs: [withQueryUnitExternal],
        gridFieldHocs: [withDisplayUnitExternalBySentFromType],
      }),
      field({
        name: 'SentFromExternalTransition',
        inputType: 'select',
        label: 'Đơn vị liên thông',
        sx: formItemSx,
        hocs: [withQueryUnitExternalTransition],
        gridFieldHocs: [withDisplayUnitExternalTransitionBySentFromType],
      }),
      field({
        name: 'SentFromInternal',
        inputType: 'select',
        label: 'Đơn vị trong hệ thống',
        sx: formItemSx,
        hocs: [withQueryUnitInternal],
        gridFieldHocs: [withDisplayUnitInternalBySentFromType],
      }),
    ],
  }),
  fieldGroup({
    hocs: [withFieldGroupLabel('Trích yếu')],
    fields: [
      field({
        name: 'DocumentAbstract',
        inputType: 'text',
        label: i18n.t('document:abstract'),
        rules: required(i18n.t('common:pleaseEnter')),
        componentProps: {
          multiline: true,
          rows: 5,
        },
        sx: formItemSx,
      }),
      field({
        name: 'Comment',
        inputType: 'text',
        label: i18n.t('document:comment'),
        componentProps: {
          multiline: true,
          rows: 5,
        },
        sx: formItemSx,
      }),
    ],
  }),
  fieldGroup({
    hocs: [withFieldGroupLabel('Tệp đính kèm')],
    fields: [
      fieldArray<FileData>({
        name: 'Attachments',
        hocs: [withUploadFileButton],
        component: AttachmentFile.FileList,
        itemComponent: AttachmentFile.FileItem,
        sx: formItemSx,
      }),
    ],
  }),
  // fieldArray<FileData>({
  //   name: 'CommentAttachments',
  //   hocs: [withUploadFileButton],
  //   component: AttachmentFile.FileList,
  //   itemComponent: AttachmentFile.FileItem,
  //   sx: formItemSx,
  // }),
];
