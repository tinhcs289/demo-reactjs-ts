import type { AutoCompleteOption } from '@/components/rhfInputs/RHFSelect';
import type { CommonFormProps } from '@/types';
import type { ComponentType } from 'react';
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
export type FormProps = CommonFormProps<FormValues>;
export type FormComponent = ComponentType<FormProps>;
