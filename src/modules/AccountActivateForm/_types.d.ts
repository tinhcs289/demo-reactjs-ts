import type { TBaseFormProps } from '@/types';
import type { ComponentType } from 'react';
export type FormValue = {
  username: string;
  optCode: string;
};
export type FormProps = TBaseFormProps<FormValue>;
export type FormType = ComponentType<FormProps>;
