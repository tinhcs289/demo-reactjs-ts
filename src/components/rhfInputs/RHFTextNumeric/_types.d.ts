import { TCommonTextNumericFieldProps } from '@/components/inputs/CommonTextNumericField/_types';
import { TRHFRules } from '@/components/rhfInputs/_types';
import { Control } from 'react-hook-form';

export type RHFTextNumericProps = {
  name: string;
  control: Control<any, any>;
  defaultValue?: string;
  shouldUnregister?: boolean;
  rules?: TRHFRules;
} & Omit<TCommonTextNumericFieldProps, 'error' | 'onChange' | 'value' | 'name'>;
