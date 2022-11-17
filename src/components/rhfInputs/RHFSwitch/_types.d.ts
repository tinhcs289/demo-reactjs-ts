import { TRHFRules } from '@/components/rhfInputs/_types';
import { TCommonSwitchFieldProps } from '@/components/inputs/CommonSwitchField';
import { Control } from 'react-hook-form';
export type TRHFSwitchProps = {
  name: string;
  control: Control<any, any>;
  defaultValue?: string;
  shouldUnregister?: boolean;
  rules?: TRHFRules;
} & Omit<TCommonSwitchFieldProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
