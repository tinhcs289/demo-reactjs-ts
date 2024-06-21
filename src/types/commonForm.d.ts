import type { CommonDialogProps } from '@/components/dialogs';
import type { AnyObject } from '@/types/AnyObject';
import type { ComponentType } from 'react';
//#region On Close callback
export type CommonFormCloseReason = 'after_success' | 'click_outside' | 'force_close';
export type CommonFormOnCloseParams = {
  reason?: CommonFormCloseReason;
  feedback?: AnyObject;
};
export type CommonFormOnClose = (params?: CommonFormOnCloseParams) => void;
//#endregion
//#region On Submit callback
export type CommomFormOnSubmit<FormValues extends AnyObject = AnyObject> = (
  values: FormValues,
  /**
   * reason for custom submit event: eg: "save_draft", "save_then_publish", ....
   */
  reason?: string
) => void;
//#endregion
//#region View Type
/**
 * - `creation`: form for creating new data
 * - `editable`: form for editing data
 * - `readonly`: form for editing data, but all inputs are disabled.
 * - `viewonly`: form for view data, it can be a difference display.
 * - `search-filter`: form for advance filter of a list view.
 */
export type CommomFormType = 'creation' | 'editable' | 'readonly' | 'viewonly' | 'search-filter';
//#endregion
//#region Common Form
export type CommonFormProps<
  FormValues extends AnyObject = AnyObject,
  FormExtendProps extends AnyObject = AnyObject,
> = {
  /**
   * @default editable
   */
  viewType?: CommomFormType;
  /**
   * field name in nested-form structure.
   * used in the case of this form corresponds to an object field of another form.
   */
  namePrefix?: string;
  /**
   * controlled values
   */
  values?: Partial<FormValues>;
  /**
   * initialized values
   */
  defaultValues?: Partial<FormValues>;
  onSubmit?: CommomFormOnSubmit<FormValues>;
  loading?: boolean;
  /**
   * being used when display form as a Dialog
   */
  onClose?: CommonFormOnClose;
  open?: boolean;
} & FormExtendProps;
export type CommonFormComponent<
  FormValues extends AnyObject = AnyObject,
  FormExtendProps extends AnyObject = AnyObject,
> = ComponentType<CommonFormProps<FormValues, FormExtendProps>>;
export type CommonFormComponentHoc<
  FormValues extends AnyObject = AnyObject,
  FormExtendProps extends AnyObject = AnyObject,
> = (
  WrappedComponent: CommonFormComponent<FormValues, FormExtendProps>
) => CommonFormComponent<FormValues, FormExtendProps>;
//#endregion
//#region Common Dialog Form
type DialogProps = Omit<CommonDialogProps, 'open' | 'onClose'>;
export type CommonDialogFormProps<FormValues extends AnyObject = AnyObject> = CommonFormProps<
  FormValues,
  DialogProps
>;
export type CommonDialogFormComponent<FormValues extends AnyObject = AnyObject> = ComponentType<
  CommonDialogFormProps<FormValues>
>;
export type CommonDialogFormComponentHoc<FormValues extends AnyObject = AnyObject> = (
  WrappedComponent: CommonDialogFormComponent<FormValues>
) => CommonDialogFormComponent<FormValues>;
//#endregion
