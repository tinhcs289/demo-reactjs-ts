import type { TAutoCompleteOption } from '@/components/rhfInputs/RHFSelect';
import type { TBaseFormProps } from '@/types';
export type FormValue = {
  Id?: string;
  Title?: string;
  FirstName?: string;
  MiddleName?: string;
  LastName?: string;
  Gender?: TAutoCompleteOption;
  PhoneNumber?: string;
  EmailAddress?: string;
  Address?: string;
};
export type FormProps = TBaseFormProps<FormValue>;
export type FormType = ComponentType<FormProps>;
