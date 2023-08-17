import { DOCUMENT_STATUS, EnumDocumentStatus } from './constants';
export function getStatusByValue(value: any) {
  const key = Object.keys(DOCUMENT_STATUS).find(
    (k) => DOCUMENT_STATUS[k as keyof typeof EnumDocumentStatus].value === value
  ) as keyof typeof EnumDocumentStatus;
  if (!key) return null;
  return DOCUMENT_STATUS[key];
}
