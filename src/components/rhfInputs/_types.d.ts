import { TextFieldProps } from '@mui/material/TextField';
import { CheckboxProps } from '@mui/material/Checkbox';
import { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

export type TRHFRules = Omit<
  RegisterOptions<FieldValues, FieldPath<FieldValues>>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export type TRHFTextProps = {
  name: string;
  control: Control<any, any>;
  defaultValue?: string;
  shouldUnregister?: boolean;
  rules?: TRHFRules;
} & Omit<TextFieldProps, 'name' | 'defaultValue'>;

export type TRHFCheckProps = {
  name: string;
  control: Control<any, any>;
  defaultValue?: string;
  shouldUnregister?: boolean;
  rules?: TRHFRules;
} & Omit<CheckboxProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
