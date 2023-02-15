import type { TCommonSwitchFieldProps } from '@/components/inputs/CommonSwitchField';
import type { TRHFInputProps } from '@/components/rhfInputs';
export type TRHFSwitchProps = {
  defaultValue?: string;
  id?: `${string}:switch:${string}`;
} & TRHFInputProps &
  Omit<TCommonSwitchFieldProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
