import type { CommonFormProps } from '@/types';
import type { ComponentType } from 'react';
export type FormValues = {
  Account: string;
  Password: string;
  RememberMe: boolean;
};
export type FormProps = CommonFormProps<FormValues> & {
  returnUri?: string;
};
export type FormComponent = ComponentType<FormProps>;