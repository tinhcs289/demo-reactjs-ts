import type { TCommonSelectFieldProps } from '@/components/inputs/CommonSelectField/_types';
import type { TRHFInputProps } from '@/components/rhfInputs/_types';

export type TRHFSelectProps = TRHFInputProps & Omit<TCommonSelectFieldProps, 'name'>;
