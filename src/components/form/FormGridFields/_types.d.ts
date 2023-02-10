import type { TFormGridItemProps } from '@/components/form/FormGridItem/_types';
import type { TRHFCheckProps } from '@/components/rhfInputs/RHFCheck/_types';
import type { TRHFCheckGroupProps } from '@/components/rhfInputs/RHFCheckGroup/_types';
import type { TRHFDateProps } from '@/components/rhfInputs/RHFDate/_types';
import type { TRHFDateMultiProps } from '@/components/rhfInputs/RHFDateMulti/_types';
import type { TRHFDateMultiPickerProps } from '@/components/rhfInputs/RHFDateMultiPicker/_types';
import type { TRHFDateMultiPickerWithTagsProps } from '@/components/rhfInputs/RHFDateMultiPickerWithTags/_types';
import type { TRHFDateTimeProps } from '@/components/rhfInputs/RHFDateTime/_types';
import type { TRHFHiddenProps } from '@/components/rhfInputs/RHFHidden/_types';
import type { TRHFNumberProps } from '@/components/rhfInputs/RHFNumber/_types';
import type { TRHFRadioProps } from '@/components/rhfInputs/RHFRadio/_types';
import type { TRHFRadioGroupProps } from '@/components/rhfInputs/RHFRadioGroup/_types';
import type { TRHFSelectProps } from '@/components/rhfInputs/RHFSelect/_types';
import type { TRHFSelectBooleanProps } from '@/components/rhfInputs/RHFSelectBoolean/_types';
import type { TRHFSwitchProps } from '@/components/rhfInputs/RHFSwitch/_types';
import type { TRHFSwitchGroupProps } from '@/components/rhfInputs/RHFSwitchGroup/_types';
import type { TRHFTagInputProps } from '@/components/rhfInputs/RHFTagInput/_types';
import type { TRHFTextProps } from '@/components/rhfInputs/RHFText/_types';
import type { TRHFTextNumericProps } from '@/components/rhfInputs/RHFTextNumeric/_types';
import type { TRHFTimeProps } from '@/components/rhfInputs/RHFTime/_types';
import type { TRHFRules } from '@/components/rhfInputs/_types';
import type { SxProps, Theme } from '@mui/material';
import type { ComponentProps, ComponentType, ReactNode } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { EFormInputType } from './constants';

export type FormInputType = `${EFormInputType}`;

export type FieldComponentProps<T extends EFormInputType> =
  T extends 'text' ? TRHFTextProps :
  T extends 'check' ? TRHFCheckProps :
  T extends 'check-group' ? TRHFCheckGroupProps :
  T extends 'radio' ? TRHFRadioProps :
  T extends 'radio-group' ? TRHFRadioGroupProps :
  T extends 'select' ? TRHFSelectProps :
  T extends 'switch' ? TRHFSwitchProps :
  T extends 'switch-group' ? TRHFSwitchGroupProps :
  T extends 'select-multi' ? TRHFSelectProps :
  T extends 'select-boolean' ? TRHFSelectBooleanProps :
  T extends 'date' ? TRHFDateProps :
  T extends 'date-time' ? TRHFDateTimeProps :
  T extends 'time' ? TRHFTimeProps :
  T extends 'date-multi' ? TRHFDateMultiProps :
  T extends 'date-multi-picker' ? TRHFDateMultiPickerProps :
  T extends 'date-multi-picker-tags' ? TRHFDateMultiPickerWithTagsProps :
  T extends 'text-tags' ? TRHFTagInputProps :
  T extends 'number' ? TRHFNumberProps :
  T extends 'numeric' ? TRHFTextNumericProps :
  T extends 'hidden' ? TRHFHiddenProps :
  ComponentProps<any>

export type FormField<T extends FieldValues, U extends FormInputType> = {
  name: keyof T;
  label: ReactNode;
  inputType: U;
  rules?: TRHFRules;
  component?: ComponentType<FieldComponentProps<U> & { [x: string]: any }>;
  componentProps?: Partial<FieldComponentProps<U>>;
  componentSx?: SxProps<Theme>;
} & Pick<
  TFormGridItemProps,
  'sx' | 'className' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'disabledXs' | 'contentProps'
>;

export type ReactHookForm<T extends FieldValues> = ReturnType<typeof useForm<T>>;

export type FormGridProps<T extends FieldValues> = {
  fields: FormField<T, any>[];
};
