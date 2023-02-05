import type { TRHFInputProps } from '@/components/rhfInputs/_types';
import type { ICommonDateMultiWithTagsFieldProps } from '@/components/inputs/CommonDateMultiWithTagsField/_types';
import type { Moment } from 'moment';

export type TRHFDateMultiWithTagsProps = {
  defaultValue?: Moment;
  id?: `${string}:dates-tags:${string}`;
} & TRHFInputProps &
  Omit<
    ICommonDateMultiWithTagsFieldProps,
    'name' | 'defaultValue' | 'value' | 'error' | 'errorText',
    'onChange'
  >;
