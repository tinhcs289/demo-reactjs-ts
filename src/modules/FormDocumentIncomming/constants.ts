import { field, fieldArray, formItemSx } from '@/components/form';
import { required } from '@/constants/rhfRules';
import { i18n } from '@/translation';
import type { FormValues } from './_types';
import withQueryDocumentBooks from './hocs/withQueryDocumentBooks';
import withQueryDocumentTypes from './hocs/withQueryDocumentTypes';
import withQueryReceivedTypes from './hocs/withQueryReceivedTypes';
import withQueryUrgencyDegrees from './hocs/withQueryUrgencyDegrees';
import AttachmentFileItem from './components/AttachmentFileItem';
import AttachmentFileList from './components/AttachmentFileList';
import withUploadFileButton from './hocs/withUploadFileButton';
export const defaultValues: FormValues = {
  Id: -1,
};
export const fields = [
  field({
    name: 'DocumentBook',
    inputType: 'select',
    label: i18n.t('document:book'),
    rules: required(i18n.t('common:pleaseSelect')),
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
  // TODO: Nởi gửi
  field({
    name: 'DatePublish',
    inputType: 'date',
    label: i18n.t('document:datePublish'),
    sx: formItemSx,
    componentProps: {
      placeholder: 'DD/MM/YYYY',
    },
    md: 6,
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
  }),
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
    name: 'UrgencyDegree',
    inputType: 'select',
    label: i18n.t('document:urgencyDegree'),
    sx: formItemSx,
    hocs: [withQueryUrgencyDegrees],
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
    name: 'Signer',
    inputType: 'text',
    label: i18n.t('document:signer'),
    sx: formItemSx,
    md: 6,
    lg: 3,
  }),
  field({
    name: 'ReceivedType',
    inputType: 'select',
    label: i18n.t('document:receivedType'),
    rules: required(i18n.t('common:pleaseSelect')),
    sx: formItemSx,
    hocs: [withQueryReceivedTypes],
    md: 6,
    lg: 3,
  }),
  fieldArray({
    name: 'Attachments',
    hocs: [withUploadFileButton],
    component: AttachmentFileList,
    itemComponent: AttachmentFileItem,
    sx: formItemSx,
  }),
  field({
    name: 'TotalOfCopies',
    inputType: 'number',
    label: i18n.t('document:totalOfCopies'),
    sx: formItemSx,
    md: 6,
    lg: 3,
  }),
  field({
    name: 'TotalOfDocumentPages',
    inputType: 'number',
    label: i18n.t('document:totalOfPages'),
    sx: formItemSx,
    md: 6,
    lg: 3,
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
  field({
    name: 'DateReceivedPaperCopy',
    inputType: 'date',
    label: i18n.t('document:dateReceivedPaperCopy'),
    componentProps: {
      placeholder: 'DD/MM/YYYY',
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
  fieldArray({
    name: 'CommentAttachments',
    hocs: [withUploadFileButton],
    component: AttachmentFileList,
    itemComponent: AttachmentFileItem,
    sx: formItemSx,
  }),
];
