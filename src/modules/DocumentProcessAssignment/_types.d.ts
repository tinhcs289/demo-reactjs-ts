import type { CommonDialogFormComponentHoc, CommonDialogFormProps, CommonFormProps, Officer } from '@/types';
import type { ComponentType } from 'react';
export type DocumentType = 'incoming' | 'outgoing';
export type AssigmentType = 'sign' | 'process';
export type AssigmentResponsibility =
  // văn bản đi
  | 'LANH_DAO'
  | 'CHU_TRI'
  | 'NHAN_DE_BIET'
  | 'PHOI_HOP'
  | 'NHAN_VB_GIAY'
  // văn bản đi
  | 'TIEP_NHAN'
  | 'KIEM_TRA_THE_THUC'
  | 'KY_DUYET'
  | 'KY_VAN_BAN'
  | 'CAP_SO'
  | 'BAN_HANH';
export type AssigmentPerOfficer = {
  Assignee: Officer;
  Responsibility: AssigmentResponsibility;
};
export type DocumentProcess = {};
export type FormValues = {
  DocumentType?: DocumentType;
  DocumentId?: string;
  AssigmentType?: AssigmentType;
  Assignees?: AssigmentPerOfficer[];
  AssigmentNote?: string;
  IsSendViaEmail?: boolean;
  IsRequiredReply?: boolean;
  ProcessId?: string;
  TaskId?: string;
};
export type FormProps = CommonFormProps<FormValues>;
export type FormComponent = ComponentType<FormProps>;
export type DialogFormProps = CommonDialogFormProps<FormValues>;
export type DialogFormComponent = ComponentType<DialogFormProps>;
export type DialogFormComponentHoc = CommonDialogFormComponentHoc<FormValues>;
