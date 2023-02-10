import type { TCommonSwitchFieldProps } from '@/components/inputs/CommonSwitchField/_types';
import type { TRHFInputProps } from '@/components/rhfInputs/_types';

export type TRHFSwitchProps = {
  defaultValue?: string;
  id?: `${string}:switch:${string}`;
} & TRHFInputProps &
  Omit<TCommonSwitchFieldProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
