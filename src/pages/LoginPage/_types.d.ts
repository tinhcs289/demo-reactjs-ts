export type TLoginFormData = {
  Account: string;
  Password: string;
  RememberMe: boolean;
  SomeField: '1' | '2';
};

export interface ILoginPageProps {
  onSubmitLoginForm?: (data: TLoginFormData) => void;
  onRequestLoginViaSSO?: (data: TLoginFormData) => void;
  loading?: boolean;
  returnUri?: string;
}
