import type { TCommonSwitchGroupFieldProps } from '@/components/inputs/CommonSwitchGroupField/_types';
import type { TRHFInputProps } from '@/components/rhfInputs/_types';
export type TRHFSwitchGroupProps = {
  defaultValue?: string;
} & TRHFInputProps &
  Omit<TCommonSwitchGroupFieldProps, 'errorText' | 'error' | 'onChange' | 'value' | 'name'>;
