import type { TAutoCompleteOption } from '@/components/rhfInputs/RHFSelect';

export type FormType<T extends { [x: string]: any }> = ComponentType<TBaseFormProps<T>>;

export type TContactFormValue = {
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
