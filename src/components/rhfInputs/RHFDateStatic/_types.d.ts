import type { CommonDateStaticFieldProps } from '@/components/inputs/CommonDateStaticField';
import type { RHFInputProps } from '@/components/rhfInputs';
import type { Moment } from 'moment';
export type RHFDateStaticProps = CommonDateStaticFieldProps &
  RHFInputProps & {
    defaultValue?: Moment;
    id?: `${string}:date:${string}`;
  };
