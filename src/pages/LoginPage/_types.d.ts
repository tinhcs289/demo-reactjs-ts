import type { TAutoCompleteOption } from '@/components/inputs/CommonSelectField/_types';
import type { TCheckGroupOption } from '@/components/inputs/CommonCheckGroupField/_types';
import type { TCommonRadioGroupFieldProps } from '@/components/inputs/CommonRadioGroupField/_types';
import type { Moment } from 'moment';

export type TLoginFormData = {
  Account: string;
  Password: string;
  RememberMe: boolean;
  Gender: TAutoCompleteOption[];
  CheckGroup: TCheckGroupOption[];
  RadioGroup?: TCommonRadioGroupFieldProps;
  Date: Moment;
};

export interface ILoginPageProps {
  onSubmitLoginForm?: (data: TLoginFormData) => void;
}
