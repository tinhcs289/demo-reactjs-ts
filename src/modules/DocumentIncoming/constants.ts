import { i18n } from '@/translation';
export enum EnumDocumentStatus {
  /**
   * "Chuyển đối số" - OCR
   */
  OCR = 'OCR',
  /**
   * "Chờ vào sổ" - CHO_VAO_SO
   */
  PENDING_RECORDED = 'CHO_VAO_SO',
  /**
   * "Chờ xử lý" - CHO_XU_LY
   */
  PENDING_ASSIGNEE = 'CHO_XU_LY',
  /**
   * "Đang xử lý" - DANG_XU_LY
   */
  IN_PROCESS = 'DANG_XU_LY',
  /**
   * "Đã xử lý" - DA_XU_LY
   */
  DONE_PROCESS = 'DA_XU_LY',
  /**
   * "Bị trả lại" - BI_TRA_LAI
   */
  BEING_RETURN = 'BI_TRA_LAI',
  /**
   * "Đã trả lại" - DA_TRA_LAI
   */
  RETURN = 'DA_TRA_LAI',
  /**
   * "Chờ cho ý kiến" - CHO_Y_KIEN
   */
  WAITING_FOR_LEADERS_COMMENTS = 'CHO_Y_KIEN',
  /**
   * "Đã cho ý kiến" - DA_CHO_Y_KIEN
   */
  LEADERS_HAVE_COMMENTED = 'DA_CHO_Y_KIEN',

  /**
   * "Bị thu hồi" - BI_THU_HOI
   */
  WITH_DRAW = 'BI_THU_HOI',
  /**
   * "Yêu cầu thu hồi" - YEU_CAU_THU_HOI
   */
  REQUEST_WITH_DRAW = 'YEU_CAU_THU_HOI',

  /**
   * "Nhận để biết" - NHAN_DE_BIET
   */
  RECEIVED_NOT_ACTION = 'NHAN_DE_BIET',
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
};
