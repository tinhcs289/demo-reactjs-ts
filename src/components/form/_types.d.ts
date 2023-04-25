import type { FormGridItemProps } from '@/components/form';
import type { RHFRules } from '@/components/rhfInputs';
import type { SxProps, Theme } from '@mui/material';
import type { ComponentType, ReactNode } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { RHFComponentProps as FieldComponentProps, FormInputType } from '@/constants/genericFormDefine';
export { FormInputType, FieldComponentProps }
export type FormFieldHoc<U extends FormInputType> = (RHFField: ComponentType<FieldComponentProps<U>>) => ComponentType<FieldComponentProps<U>>;
type FormFieldGridProps = Pick<
  FormGridItemProps,
  'sx' | 'className' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'disabledXs' | 'contentProps'
>
export type FormField<T extends FieldValues, U extends FormInputType> = {
  name: keyof T;
  inputType?: U;
  label?: ReactNode;
  rules?: RHFRules;
  component?: ComponentType<FieldComponentProps<U> & { [x: string]: any }>;
  componentProps?: Partial<FieldComponentProps<U>>;
  componentSx?: SxProps<Theme>;
  hocs?: FormFieldHoc<U>[];
  fields?: FormField<any, any>[];
} & FormFieldGridProps;
export type ReactHookForm<T extends FieldValues> = ReturnType<typeof useForm<T>>;
export type FormGridProps<T extends FieldValues> = {
  fields: Array<FormField<T, any>>;
};
