export type LoginFormData = {
  Account: string;
  Password: string;
  RememberMe: boolean;
  SomeField: '1' | '2';
};
export type LoginPageProps = {
  onSubmitLoginForm?: (data: LoginFormData) => void;
  onRequestLoginViaSSO?: (data: LoginFormData) => void;
  loading?: boolean;
  returnUri?: string;
};
