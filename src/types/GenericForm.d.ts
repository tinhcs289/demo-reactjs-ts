import type { AnyObject } from '@/types/AnyObject';
import type { ComponentType } from 'react';
export type GenericFormOnSubmitHandler<T extends AnyObject> = (formData?: T) => void;
export type GenericFormOnCloseHandler = (args?: { shouldReloadAfterClosed?: boolean, committedId?: number | string, closedAfterSubmitSuccess?: boolean }) => void;
export type GenericFormOnChangeValuesHandler = (value?: T) => void;
export type GenericFormViewType = 'create' | 'detail' | 'edit';
export type GenericFormProps<T extends AnyObject> = {
  id?: number | string;
  view?: GenericFormViewType;
  defaultValues?: T;
  loading?: boolean;
  onSubmit?: GenericFormOnSubmitHandler<T>;
  onClose?: GenericFormOnCloseHandler;
  resetOnClose?: boolean;
  onChange?: GenericFormOnChangeValuesHandler<T>;
  subForm?: boolean;
};
export type GenericForm<T extends AnyObject> = ComponentType<GenericFormProps<T>>