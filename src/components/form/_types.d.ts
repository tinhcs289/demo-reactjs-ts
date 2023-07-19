import type { GridContainerProps, GridItemProps } from '@/components/grid';
import type { RHFRules } from '@/components/rhfInputs';
import type { RHFComponentProps as FieldComponentProps, FormInputType } from '@/constants/genericFormDefine';
import { AnyObject } from '@/types';
import type { SxProps, Theme } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import type { ComponentType, FormEventHandler, ReactNode } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
export { FormInputType, FieldComponentProps };
export type FormFieldHoc<U extends FormInputType> = (
  RHFField: ComponentType<FieldComponentProps<U>>
) => ComponentType<FieldComponentProps<U>>;
export type FormGridFieldHoc = (
  FormGridItem: ComponentType<FormGridProps<AnyObject>>
) => ComponentType<FormGridProps<AnyObject>>;
type FormFieldGridProps = Pick<
  FormGridItemProps,
  'sx' | 'className' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'disabledXs' | 'contentProps'
>;
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
  gridFieldHocs?: FormGridFieldHoc[];
} & Partial<FormFieldGridProps>;
export type ReactHookForm<T extends FieldValues> = ReturnType<typeof useForm<T>>;
export type FormGridProps<T extends FieldValues> = {
  fields: Array<FormField<T, any>>;
  variant?: 'linear' | 'vertical';
};
export type FormGridContainerProps = GridContainerProps & {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  formProps?: BoxProps<'form'>;
  loading?: boolean;
};
export type FormGridItemProps = GridItemProps & {
  disabledXs?: boolean;
  label?: ReactNode;
};
