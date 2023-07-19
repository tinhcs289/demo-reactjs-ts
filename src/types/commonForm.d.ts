import type { AnyObject } from '@/types/AnyObject';
import type { ComponentType } from 'react';
export type CommonFormCloseReason = 'after_success' | 'click_outside' | 'force_close';
export type CommonFormOnCloseParams = {
  reason?: CommonFormCloseReason;
  feedback?: AnyObject;
};
export type CommomFormOnSubmit<FormValues extends AnyObject = AnyObject> = (
  values: FormValues,
  /**
   * reason for custom submit event: eg: "save_draft", "save_then_publish", ....
   */
  reason?: string
) => void;
export type CommonFormOnClose = (params?: CommonFormOnCloseParams) => void;
export type CommonFormProps<FormValues extends AnyObject = AnyObject> = {
  /**
   * field name in nested-form structure.
   * used in the case of this form corresponds to an object field of another form.
   */
  namePrefix?: string;
  defaultValues?: FormValues;
  onSubmit?: CommomFormOnSubmit<FormValues>;
  onClose?: CommonFormOnClose;
  loading?: boolean;
  [x: string]: any;
};
export type CommonFormComponent<FormValues extends AnyObject = AnyObject> = ComponentType<
  CommonFormProps<FormValues>
>;
