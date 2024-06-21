import type { RHFInputProps } from '@/components/rhfInputs';
import type { AnyObject } from '@/types';
import type { ComponentType } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { FormField } from '../_types';
export type CustomInputProps<InputProps extends AnyObject = AnyObject> = RHFInputProps<InputProps>;
export type CustomInput<InputProps extends AnyObject = AnyObject> = ComponentType<
  CustomInputProps<InputProps>
>;
export type CustomInputHocs<InputProps extends AnyObject = AnyObject> = (
  WrappedComponent: CustomInput<InputProps>
) => CustomInput<InputProps>;
export default function fieldCustom<
  InputProps extends AnyObject = AnyObject,
  T extends FieldValues = FieldValues,
>(
  args: Omit<FormField<T, 'field-unknown'>, 'inputType' | 'component' | 'componentProps' | 'hocs'> & {
    component: CustomInput<InputProps>;
    componentProps?: Partial<CustomInputProps<InputProps>>;
    hocs?: CustomInputHocs<InputProps>[];
  }
): FormField<T, 'field-unknown'> {
  return { ...args, inputType: 'field-unknown' };
}
