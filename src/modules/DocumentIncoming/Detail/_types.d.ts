import type { CommonFormProps, FileData } from '@/types';
import type { Moment } from 'moment';
import type { ComponentType } from 'react';
import type { DocumentReceivedType } from '@/hooks/useReactQueries/useQueryDocumentReceivedType';
import type { UrgencyDegree } from '@/hooks/useReactQueries/useQueryUrgencyDegrees';
import type { AutoCompleteOption } from '@/components/rhfInputs/RHFSelect';
import type { RadioGroupOption } from '@/components/rhfInputs/RHFRadioGroup';
import type { DocumentType } from '@/hooks/useReactQueries/useQueryDocumentType';
import type { IncommingDocumentBook } from '@/hooks/useReactQueries/useQueryIncommingDocumentBooks';
import type { PoliceUnitInternal } from '@/hooks/useReactQueries/useQueryPoliceUnitInternal';
import type { PoliceUnitExternal } from '@/hooks/useReactQueries/useQueryPoliceUnitExternal';
export type FormValues = {
  Id?: string | number;
  /**
   * Sổ vản bản
   */
  DocumentBook?: AutoCompleteOption<IncommingDocumentBook>;
  /**
   * Loại văn bản
   */
  DocumentType?: AutoCompleteOption<DocumentType>;
  /**
   * Kiểu nơi gửi
   */
  SentFromType?: RadioGroupOption;
  /**
   * Nơi gửi (nếu nhận từ đơn vị nội bộ)
   */
  SentFromInternal?: AutoCompleteOption<PoliceUnitInternal>;
  /**
   * Nơi gửi (nếu nhận từ đơn vị ngoài / liên thông)
   */
  SentFromExternal?: AutoCompleteOption<PoliceUnitExternal>;
  /**
   * Số đến
   */
  NumberInIssueBook?: number;
  /**
   * Số phụ
   */
  NumberSub?: number;
  /**
   * Trạng thái
   */
  Status?: AutoCompleteOption;
  /**
   * Ký hiệu văn bản
   */
  DocumentNotation?: string;
  /**
   * Ngày phát hành
   */
  DatePublish?: Moment;
  /**
   * Ngày đến
   */
  DateIncomming?: Moment;
  /**
   * Trích yếu
   */
  DocumentAbstract?: string;
  /**
   * Độ khẩn
   */
  UrgencyDegree?: AutoCompleteOption<UrgencyDegree>;
  /**
   * Hạn xử lý
   */
  DateProcessDeadline?: Moment;
  /**
   * Người ký
   */
  Signer?: string;
  /**
   * Phương thức nhận
   */
  ReceivedType?: AutoCompleteOption<DocumentReceivedType>;
  /**
   * Tệp đính kèm
   */
  Attachments?: FileData[];
  /**
   * Số bản
   */
  TotalOfCopies?: number;
  /**
   * Số trang
   */
  TotalOfDocumentPages?: number;
  /**
   * Đã nhận được bản giấy
   */
  HaveReceivedPaperCopy?: boolean;
  /**
   * Ngày nhận bản giấy
   */
  DateReceivedPaperCopy?: Moment;
  /**
   * Là yêu cầu trả lời
   */
  IsRequestReply?: boolean;
  /**
   * Văn bản QPPL (Quy phạm pháp luật)
   */
  IsLegalDocument?: boolean;
  /**
   * Ý kiến xử lý
   */
  Comment?: string;
  /**
   * Tệp đính kèm
   */
  CommentAttachments?: FileData[];
};
export type FormProps = CommonFormProps<FormValues>;
export type FormComponent = ComponentType<FormProps>;
