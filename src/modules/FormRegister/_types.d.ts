import type { GridProps } from '@mui/material/Grid';
export type FormValues = {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  PasswordReEntered: string;
  IAcceptWithTermAndCondition: boolean;
};
export type FormSubmitHandler = (values: FormValues) => void;
export type FormProps = GridProps & {
  onSubmit?: FormSubmitHandler;
  loading?: boolean;
  returnUri?: string;
};
export type FormComponent = ComponentType<FormProps>;