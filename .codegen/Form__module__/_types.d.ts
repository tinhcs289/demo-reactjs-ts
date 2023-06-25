//@ts-nocheck --entire-file
import type { CommonFormProps } from '@/types';
import type { ComponentType } from 'react';
export type FormValues = {
  Id?: string | number;
  SomeField?: string;
};
export type FormProps = CommonFormProps<FormValues>;
export type FormComponent = ComponentType<FormProps>;
