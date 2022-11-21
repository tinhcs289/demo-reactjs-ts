import type { TCommonSwitchFieldProps } from '@/components/inputs/CommonSwitchField';
import type { TRHFInputProps } from '@/components/rhfInputs/_types';

export type TRHFSwitchProps = {
  defaultValue?: string;
} & TRHFInputProps &
  Omit<TCommonSwitchFieldProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
