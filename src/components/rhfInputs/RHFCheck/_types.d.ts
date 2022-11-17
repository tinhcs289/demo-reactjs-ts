import { TRHFRules } from '@/components/rhfInputs/_types';
import { TCommonCheckFieldProps } from '@/components/inputs/CommonCheckField';
import { Control } from 'react-hook-form';
export type TRHFCheckProps = {
  name: string;
  control: Control<any, any>;
  defaultValue?: string;
  shouldUnregister?: boolean;
  rules?: TRHFRules;
} & Omit<TCommonCheckFieldProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
