import render from '@/helpers/reactHelpers/render';
import withHOCs from '@/hocs/withHocs';
import get from 'lodash/get';
import { Fragment, useCallback } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import type { FormField, FormGridProps } from '../_types';
import { COMPONENT_DICT } from '../constants';
import FormGridItem from './FormGridItem';
export default function FormGridFields<T extends FieldValues>(props: FormGridProps<T>) {
  const { fields } = props;
  const { control } = useFormContext();
  const renderField = useCallback(
    (field: FormField<T, any>) => {
      const {
        name,
        label,
        inputType,
        rules,
        component,
        componentProps,
        componentSx,
        hocs,
        fields: _fields,
        ...itemProps
      } = field;
      if (!name) return null;
      if (_fields instanceof Array && _fields.length >= 0) {
        const subFields = _fields.map((sf) => ({
          ...sf,
          name: `${name as string}.${(sf?.name as string) || ''}`,
        }));
        return (
          <FormGridItem
            {...itemProps}
            key={field.name as any}
            contentProps={{ container: true, width: '100%', height: '100%', ...itemProps?.contentProps }}
          >
            <FormGridFields fields={subFields} />
          </FormGridItem>
        );
      }
      if (!inputType) return null;
      let input = component;
      if (!input) input = (COMPONENT_DICT as any)[inputType as any];
      if (!input) return <Fragment key={field.name as any} />;
      const inputProps: { [x: string]: any } = { name, label, rules, control, ...componentProps };
      if (!!componentProps?.sx || !!componentSx)
        inputProps['sx'] = {
          ...get(componentProps, 'sx', {}),
          ...componentSx,
        };
      if (hocs instanceof Array && hocs.length > 0) input = withHOCs(...hocs)(input);
      return (
        <FormGridItem {...itemProps} key={field.name as any}>
          {render(input, inputProps)}
        </FormGridItem>
      );
    },
    [control]
  );
  return <>{fields.map(renderField as any)}</>;
}
