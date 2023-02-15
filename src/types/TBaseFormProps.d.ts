export type TBaseFormProps<T extends { [x: string]: any }> = {
  id?: number | string;
  view?: 'create' | 'detail' | 'edit';
  defaultValues?: T;
  loading?: boolean;
  onSubmit?: (formData?: T) => void;
  onClose?: (args?: { reload?: boolean }) => void;
  resetOnClose?: boolean;
  onChange?: (value?: T) => void;
  subForm?: boolean;
};
