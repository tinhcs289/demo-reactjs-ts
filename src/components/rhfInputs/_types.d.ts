import type { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

export type TRHFRules = Omit<
  RegisterOptions<FieldValues, FieldPath<FieldValues>>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export type TRHFInputProps = {
  name: string;
  control: Control<any, any>;
  shouldUnregister?: boolean;
  rules?: TRHFRules;
};
