import type { FormGridItemProps } from '@/components/form';
import type { RHFRules } from '@/components/rhfInputs';
import type { RHFCheckProps } from '@/components/rhfInputs/RHFCheck';
import type { RHFCheckGroupProps } from '@/components/rhfInputs/RHFCheckGroup';
import type { RHFDateProps } from '@/components/rhfInputs/RHFDate';
import type { RHFDateMultiProps } from '@/components/rhfInputs/RHFDateMulti';
import type { RHFDateTimeProps } from '@/components/rhfInputs/RHFDateTime';
import type { RHFHiddenProps } from '@/components/rhfInputs/RHFHidden';
import type { RHFKeyboardDateProps } from '@/components/rhfInputs/RHFKeyboardDate';
import type { RHFNumberProps } from '@/components/rhfInputs/RHFNumber';
import type { RHFRadioProps } from '@/components/rhfInputs/RHFRadio';
import type { RHFRadioGroupProps } from '@/components/rhfInputs/RHFRadioGroup';
import type { RHFSelectProps } from '@/components/rhfInputs/RHFSelect';
import type { RHFSelectBooleanProps } from '@/components/rhfInputs/RHFSelectBoolean';
import type { RHFSwitchProps } from '@/components/rhfInputs/RHFSwitch';
import type { RHFSwitchGroupProps } from '@/components/rhfInputs/RHFSwitchGroup';
import type { RHFTagInputProps } from '@/components/rhfInputs/RHFTagInput';
import type { RHFTextProps } from '@/components/rhfInputs/RHFText';
import type { RHFTextNumericProps } from '@/components/rhfInputs/RHFTextNumeric';
import type { RHFTimeProps } from '@/components/rhfInputs/RHFTime';
import type { SxProps, Theme } from '@mui/material';
import type { ComponentProps, ComponentType, ReactNode } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { EFormInputType } from './constants';
export type FormInputType = `${EFormInputType}`;
export type FieldComponentProps<T extends FormInputType> = T extends 'text'
  ? RHFTextProps
  : T extends 'check'
  ? RHFCheckProps
  : T extends 'check-group'
  ? RHFCheckGroupProps
  : T extends 'radio'
  ? RHFRadioProps
  : T extends 'radio-group'
  ? RHFRadioGroupProps
  : T extends 'select'
  ? RHFSelectProps
  : T extends 'switch'
  ? RHFSwitchProps
  : T extends 'switch-group'
  ? RHFSwitchGroupProps
  : T extends 'select-multi'
  ? RHFSelectProps
  : T extends 'select-boolean'
  ? RHFSelectBooleanProps
  : T extends 'date'
  ? RHFDateProps
  : T extends 'date-keyboard'
  ? RHFKeyboardDateProps
  : T extends 'date-time'
  ? RHFDateTimeProps
  : T extends 'time'
  ? RHFTimeProps
  : T extends 'date-multi'
  ? RHFDateMultiProps
  : T extends 'text-tags'
  ? RHFTagInputProps
  : T extends 'number'
  ? RHFNumberProps
  : T extends 'numeric'
  ? RHFTextNumericProps
  : T extends 'hidden'
  ? RHFHiddenProps
  : ComponentProps<any>;
export type FormFieldHoc<U extends FormInputType> = (RHFField: ComponentType<FieldComponentProps<U>>) => ComponentType<FieldComponentProps<U>>;
export type FormField<T extends FieldValues, U extends FormInputType> = {
  name: keyof T;
  inputType: U;
  label?: ReactNode;
  rules?: RHFRules;
  component?: ComponentType<FieldComponentProps<U> & { [x: string]: any }>;
  componentProps?: Partial<FieldComponentProps<U>>;
  componentSx?: SxProps<Theme>;
  hocs?: FormFieldHoc<U>[];
} & Pick<
  FormGridItemProps,
  'sx' | 'className' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'disabledXs' | 'contentProps'
>;
export type ReactHookForm<T extends FieldValues> = ReturnType<typeof useForm<T>>;
export type FormGridProps<T extends FieldValues> = {
  fields: FormField<T, any>[];
};
