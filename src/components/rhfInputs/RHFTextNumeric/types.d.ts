import { TCommonTextNumericFieldProps } from '@/components/inputs/CommonTextNumericField/types';
import { TRHFRules } from '@/components/rhfInputs/types';
import { Control } from 'react-hook-form';

export type RHFTextNumericProps = {
  name: string;
  control: Control<any, any>;
  defaultValue?: string;
  shouldUnregister?: boolean;
  rules?: TRHFRules;
} & Omit<TCommonTextNumericFieldProps, 'error' | 'onChange' | 'value' | 'name'>;
