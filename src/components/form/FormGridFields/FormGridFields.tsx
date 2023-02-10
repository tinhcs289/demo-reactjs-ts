import FormGridItem from '@/components/form/FormGridItem';
import render from '@/helpers/reactHelpers/render';
import get from 'lodash/get';
import { Fragment, useCallback } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { COMPONENT_DICT } from './constants';
import type { FormField, FormGridProps } from './_types';

export default function FormGridFields<T extends FieldValues>(props: FormGridProps<T>) {
  const { fields } = props;
  const form = useFormContext();

  const renderField = useCallback(
    (field: FormField<T, any>, index: number, allFields: FormField<T, any>[]) => {
      const { name, label, inputType, rules, component, componentProps, componentSx, ...itemProps } = field;
      let input = component;
      if (!input) input = (COMPONENT_DICT as any)[inputType as any];
      if (!input) return <Fragment key={field.name as any} />;

      const inputProps = {
        name: name,
        control: form.control,
        label: label,
        rules: rules,
        ...componentProps,
        sx: {
          ...get(componentProps, 'sx', {}),
          ...componentSx,
        },
      };
      return (
        <FormGridItem {...itemProps} key={field.name as any}>
          {render(input, inputProps)}
        </FormGridItem>
      );
    },
    [form]
  );

  return <>{fields.map(renderField)}</>;
}
