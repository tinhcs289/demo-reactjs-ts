import type { CommonFormProps } from '@/types';
export type FormValues = {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  PasswordReEntered: string;
  IAcceptWithTermAndCondition: boolean;
};
export type FormProps = CommonFormProps<FormValues> & {
  returnUri?: string;
};
export type FormComponent = ComponentType<FormProps>;