import { TRHFRules } from '@/components/rhfInputs/_types';
import { TextFieldProps } from '@mui/material/TextField';
import { Control } from 'react-hook-form';

export type TRHFTextProps = {
  name: string;
  control: Control<any, any>;
  defaultValue?: string;
  shouldUnregister?: boolean;
  rules?: TRHFRules;
} & Omit<TextFieldProps, 'name' | 'defaultValue'>;
