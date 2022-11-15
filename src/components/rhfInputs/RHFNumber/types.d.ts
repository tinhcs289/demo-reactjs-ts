import { TCommonNumberFieldProps } from '@/components/inputs/CommonNumberField/types';
import { TRHFRules } from '@/components/rhfInputs/types';
import { Control } from 'react-hook-form';

export type TRHFNumberProps = {
  name: string;
  control: Control<any, any>;
  defaultValue?: string;
  shouldUnregister?: boolean;
  rules?: TRHFRules;
} & Omit<TCommonNumberFieldProps, 'error' | 'onChange' | 'value' | 'name'>;
