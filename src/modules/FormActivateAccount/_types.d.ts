import type { CommonFormProps } from '@/types';
import type { ComponentType } from 'react';
export type FormValues = {
  username: string;
  optCode: string;
};
export type FormProps = CommonFormProps<FormValues>;
export type FormComponent = ComponentType<FormProps>;
