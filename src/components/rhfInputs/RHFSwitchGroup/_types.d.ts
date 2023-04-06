import type { CommonSwitchGroupFieldProps } from '@/components/inputs/CommonSwitchGroupField';
import type { RHFInputProps } from '@/components/rhfInputs';
export type RHFSwitchGroupProps = {
  defaultValue?: string;
  id?: `${string}:switch-group:${string}`;
} & RHFInputProps &
  Omit<CommonSwitchGroupFieldProps, 'errorText' | 'error' | 'onChange' | 'value' | 'name'>;
export type { SwitchGroupOption } from '@/components/inputs/CommonSwitchGroupField';
