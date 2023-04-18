import type { AutoCompleteOption } from '@/components/rhfInputs/RHFSelect';
import type { GenericFormProps } from '@/types';
export type FormValues = {
  Id?: string;
  Title?: string;
  FirstName?: string;
  MiddleName?: string;
  LastName?: string;
  Gender?: AutoCompleteOption;
  PhoneNumber?: string;
  EmailAddress?: string;
  Address?: string;
};
export type FormProps = GenericFormProps<FormValue>;
export type FormComponent = ComponentType<FormProps>;
