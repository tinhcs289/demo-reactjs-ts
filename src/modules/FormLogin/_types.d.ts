import type { GridProps } from '@mui/material/Grid';
export type FormValues = {
  Account: string;
  Password: string;
  RememberMe: boolean;
};
export type FormSubmitHandler = (values: FormValues) => void;
export type FormProps = GridProps & {
  onSubmitFormLogin?: FormSubmitHandler;
  onRequestLoginViaSSO?: FormSubmitHandler;
  loading?: boolean;
  returnUri?: string;
};
export type FormComponent = ComponentType<FormProps>;