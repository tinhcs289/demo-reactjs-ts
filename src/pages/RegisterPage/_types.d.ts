export type TRegisterFormData = {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  PasswordReEntered: string;
  IAcceptWithTermAndCondition: boolean;
};

export interface IRegisterPageProps {
  onSubmitRegisterForm?: (data: TRegisterFormData) => void;
}
