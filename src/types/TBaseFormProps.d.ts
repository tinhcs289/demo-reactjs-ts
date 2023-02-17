export type TBaseFormOnSubmitHandler<T extends { [x: string]: any }> = (formData?: T) => void;
export type TBaseFormOnCloseHandler = (args?: { shouldReloadAfterClosed?: boolean, committedId?: number | string, closedAfterSubmitSuccess?: boolean }) => void;
export type TBaseFormOnChangeValuesHandler = (value?: T) => void;
export type TBaseFormViewType = 'create' | 'detail' | 'edit';
export type TBaseFormProps<T extends { [x: string]: any }> = {
  id?: number | string;
  view?: TBaseFormViewType;
  defaultValues?: T;
  loading?: boolean;
  onSubmit?: TBaseFormOnSubmitHandler<T>;
  onClose?: TBaseFormOnCloseHandler;
  resetOnClose?: boolean;
  onChange?: TBaseFormOnChangeValuesHandler<T>;
  subForm?: boolean;
};
