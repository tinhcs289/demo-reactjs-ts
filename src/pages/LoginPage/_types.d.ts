import { TAutoCompleteOption } from '@/components/inputs/CommonSelectField/_types';
import { TCheckGroupOption } from '@/components/inputs/CommonCheckGroupField/_types';
import { TCommonRadioGroupFieldProps } from '@/components/inputs/CommonRadioGroupField/_types';

export type TLoginFormData = {
  Account: string;
  Password: string;
  RememberMe: boolean;
  Gender: TAutoCompleteOption[];
  CheckGroup: TCheckGroupOption[];
  RadioGroup?: TCommonRadioGroupFieldProps;
};

export interface ILoginPageProps {
  onSubmitLoginForm?: (data: TLoginFormData) => void;
}
