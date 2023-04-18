import type { GenericFormProps } from '@/types';
import type { ComponentType } from 'react';
export type FormValues = {
  username: string;
  optCode: string;
};
export type FormProps = GenericFormProps<FormValues>;
export type FormComponent = ComponentType<FormProps>;
