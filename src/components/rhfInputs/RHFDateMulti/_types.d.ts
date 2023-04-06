import type { CommonDateMultiFieldProps } from '@/components/inputs/CommonDateMultiField';
import type { RHFInputProps } from '@/components/rhfInputs';
import type { Moment } from 'moment';
export type RHFDateMultiProps = CommonDateMultiFieldProps & RHFInputProps & {
  defaultValue?: Moment;
  id?: `${string}:dates:${string}`;
}
