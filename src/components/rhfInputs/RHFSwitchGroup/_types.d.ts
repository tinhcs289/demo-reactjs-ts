import type { TCommonSwitchGroupFieldProps } from '@/components/inputs/CommonSwitchGroupField/_types';
import type { TRHFInputProps } from '@/components/rhfInputs/_types';
export type TRHFSwitchGroupProps = {
  defaultValue?: string;
  id?: `${string}:switch-group:${string}`;
} & TRHFInputProps &
  Omit<TCommonSwitchGroupFieldProps, 'errorText' | 'error' | 'onChange' | 'value' | 'name'>;
