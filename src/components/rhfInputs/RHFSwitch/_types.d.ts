import type { CommonSwitchFieldProps } from '@/components/inputs/CommonSwitchField';
import type { RHFInputProps } from '@/components/rhfInputs';
export type RHFSwitchProps = {
  defaultValue?: string;
  id?: `${string}:switch:${string}`;
} & RHFInputProps &
  Omit<CommonSwitchFieldProps, 'checked' | 'error' | 'onChange' | 'value' | 'name'>;
