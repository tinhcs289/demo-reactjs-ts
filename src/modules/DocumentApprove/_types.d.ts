import type { CommonDialogFormComponentHoc, CommonDialogFormProps, CommonFormProps } from '@/types';
import type { ComponentType } from 'react';
export type FormValues = {
  Comment?: string;
};
export type FormProps = CommonFormProps<FormValues>;
export type FormComponent = ComponentType<FormProps>;
export type DialogFormProps = CommonDialogFormProps<FormValues>;
export type DialogFormComponent = ComponentType<DialogFormProps>;
export type DialogFormComponentHoc = CommonDialogFormComponentHoc<FormValues>;
