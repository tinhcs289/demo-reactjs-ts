import { i18n } from '@/translation';
export enum EnumDocumentStatus {
  PENDING_RECORDED = 'CHO_VAO_SO',
  /**
   * "Chờ vào sổ điện tử"
   */
  PENDING_RECORDED_DIGITAL = 'CHO_VAO_SO_DIEN_TU',
  /**
   * "Chờ phân xử lý"
   */
  PENDING_ASSIGMENT = 'CHO_PHAN_XU_LY',
  /**
   * "Chờ xử lý"
   */
  PENDING_ASSIGNEE = 'CHO_XU_LY',
  /**
   * "Đang xử lý"
   */
  IN_PROCESS = 'DANG_XU_LY',
  /**
   * "Đã xử lý"
   */
  DONE_PROCESS = 'DA_XU_LY',
  /**
   * "Trả lại"
   */
  PENDING_RETURN = 'TRA_LAI',
  /**
   * "Đã trả lại"
   */
  RETURN = 'DA_TRA_LAI',
  /**
   * "Thu hồi"
   */
  WITH_DRAW = 'THU_HOI',
  /**
   * "Yêu cầu thu hồi"
   */
  REQUEST_WITH_DRAW = 'YEU_CAU_THU_HOI',
  /**
   * "Nhận để biết"
   */
  RECEIVED_NOT_ACTION = 'NHAN_DE_BIET',
  /**
   * "Hủy"
   */
  CANCELLED = 'HUY',
}
export const DOCUMENT_STATUS = Object.keys(EnumDocumentStatus).reduce((d, k) => {
  return {
    ...d,
    [k]: {
      value: Object.values(EnumDocumentStatus)[Object.keys(EnumDocumentStatus).indexOf(k)],
      text: i18n.t(`document:status/${k}`),
    },
  };
}, {}) as {
  [k in keyof typeof EnumDocumentStatus]: {
    value: Pick<typeof EnumDocumentStatus, `${k}`>[`${k}`];
    text: string;
  };
};
export function getStatusByValue(value: any) {
  const key = Object.keys(DOCUMENT_STATUS).find(
    (k) => DOCUMENT_STATUS[k as keyof typeof EnumDocumentStatus].value === value
  ) as keyof typeof EnumDocumentStatus;
  if (!key) return null;
  return DOCUMENT_STATUS[key];
}
