import type { CommonTimeStaticFieldProps } from '@/components/inputs/CommonTimeStaticField';
import type { RHFInputProps } from '@/components/rhfInputs';
import type { Moment } from 'moment';
export type RHFTimeStaticProps = CommonTimeStaticFieldProps &
  RHFInputProps & {
    defaultValue?: Moment;
    id?: `${string}:time:${string}`;
  };
