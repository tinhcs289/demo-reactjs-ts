import type { TCommonSwitchGroupFieldProps } from '@/components/inputs/CommonSwitchGroupField';
import type { TRHFInputProps } from '@/components/rhfInputs';
export type TRHFSwitchGroupProps = {
  defaultValue?: string;
  id?: `${string}:switch-group:${string}`;
} & TRHFInputProps &
  Omit<TCommonSwitchGroupFieldProps, 'errorText' | 'error' | 'onChange' | 'value' | 'name'>;
export type { TSwitchGroupOption } from '@/components/inputs/CommonSwitchGroupField';
