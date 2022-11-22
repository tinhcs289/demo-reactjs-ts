export type TLoginFormData = {
  Account: string;
  Password: string;
  RememberMe: boolean;
};

export interface ILoginPageProps {
  onSubmitLoginForm?: (data: TLoginFormData) => void;
}
