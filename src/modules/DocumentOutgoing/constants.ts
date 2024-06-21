import { i18n } from '@/translation';
export enum EnumDocumentStatus {
  /**
   * "Chuyển đối số" - OCR
   */
  OCR = 'OCR',
  /**
   * "Chờ trình ký" - CHO_TRINH_KY
   */
  PENDING_SIGNATURE_REQUEST = 'CHO_TRINH_KY',
  /**
   * "Chờ xử lý" - CHO_XU_LY
   */
  PENDING_ASSIGNEE = 'CHO_XU_LY',
  /**
   * "Đã xử lý" - DA_XU_LY
   */
  DONE_PROCESS = 'DA_XU_LY',
  /**
   * "Chờ cấp số" - CHO_CAP_SO
   */
  WAITING_FOR_NUMBER = 'CHO_CAP_SO',
  /**
   * "Chờ ban hành" - CHO_BAN_HANH
   */
  PENDING_PUBLISH = 'CHO_BAN_HANH',
  /**
   * "Đã ban hành" - DA_BAN_HANH
   */
  PUBLISHED = 'DA_BAN_HANH',
  /**
   * "Nội bộ" - "NOI_BO"
   */
  INTERNAL = 'NOT_BO',
  /**
   * "Bị trả lại" - BI_TRA_LAI
   */
  BEING_RETURN = 'BI_TRA_LAI',
  /**
   * "Đã trả lại" - DA_TRA_LAI
   */
  RETURN = 'DA_TRA_LAI',
  /**
   * "Chờ ý kiến" - CHO_Y_KIEN
   */
  WAITING_FOR_LEADERS_COMMENTS = 'CHO_Y_KIEN',
  /**
   * "Đã cho ý kiến" - DA_CHO_Y_KIEN
   */
  LEADERS_HAVE_COMMENTED = 'DA_CHO_Y_KIEN',
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
export const QS_LIST = {
  PAGE_INDEX: 'pageIndex',
  PAGE_SIZE: 'pageSize',
  SORT_BY: 'sortBy',
  SORT_DIRIECTION: 'sortDirection',
};
export const MUTATE_ACTION = {
  /**
   * Số hóa văn bản
   */
  CREATE_OCR: 'create_ocr',
  /**
   * Tạo mới
   */
  CREATE: 'create',
  /**
   * Tạo mới bản trình ký
   */
  CREATE_REQUEST_SIGNATURE: 'create_request_signature',
  /**
   * Xin ý kiến
   */
  CREATE_REQUEST_COMMENT: 'create_request_comment',
  /**
   * Cấp số ban hành
   */
  CREATE_NUMBER_OF_PUBLISH: 'create_number_of_publish',
  /**
   * Ban hành
   */
  PUBLISH: 'publish',
  /**
   * Ban hành và bổ sung
   */
  PUBLISH_WITH_ADDICTIONAL: 'publish_with_addictional',
  /**
   * Lưu nháp
   */
  DRAFT: 'draft',
  /**
   * Lưu nháp rồi phân xử lý
   */
  DRAFT_THEN_ASSIGN: 'draft_then_assign',
  /**
   * Lưu nháp rồi đóng
   */
  DRAFT_THEN_CLOSE: 'draft_then_close',
  /**
   * Lưu cập nhật
   */
  UPDATE: 'update',
  /**
   * Xóa
   */
  DELETE: 'delete',
  /**
   * Xuất dữ liệu
   */
  EXPORT_EXCEL: 'export_excel',
  /**
   *  Phân xử lý
   */
  CREATE_ASSIGNMENT: 'create_assigment',
  /**
   * Duyệt
   */
  APPROVE: 'approve',
  /**
   * Trình ký
   */
  REQUEST_SIGN: 'request_sign',
};
