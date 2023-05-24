import render from '@/helpers/reactHelpers/render';
import withHOCs from '@/hocs/withHocs';
import get from 'lodash/get';
import { Fragment, useCallback } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import type { FormField, FormGridProps } from '../_types';
import { COMPONENT_DICT } from '../constants';
import FormGridFields from './FormGridFields';
import FormGridItem from './FormGridItem';
export default function FormGridFieldsVertical<T extends FieldValues>(props: FormGridProps<T>) {
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
        xs: __xs,
        sm: __sm,
        md: __md,
        lg: __lg,
        xl: __xl,
        disabledXs: __disabledXs,
        ...itemProps
      } = field;
      if (!name) return null;
      const required = !!rules?.required;
      if (_fields instanceof Array && _fields.length >= 0) {
        const subFields = _fields.map((sf) => ({
          ...sf,
          name: `${name as string}.${(sf?.name as string) || ''}`,
        }));
        return (
          <Fragment key={field.name as any}>
            <FormGridItem md={2} {...itemProps}>
              {label}
              {!required ? null : <>&nbsp;{`*`}</>}
            </FormGridItem>
            <FormGridItem
              md={10}
              {...itemProps}
              contentProps={{ container: true, width: '100%', height: '100%', ...itemProps?.contentProps }}
            >
              <FormGridFields fields={subFields} />
            </FormGridItem>
          </Fragment>
        );
      }
      if (!inputType) return null;
      let input = component;
      if (!input) input = (COMPONENT_DICT as any)[inputType as any];
      if (!input) return <Fragment key={field.name as any} />;
      const inputProps: { [x: string]: any } = { name, rules, control, ...componentProps };
      if (!!componentProps?.sx || !!componentSx)
        inputProps['sx'] = {
          ...get(componentProps, 'sx', {}),
          ...componentSx,
        };
      if (hocs instanceof Array && hocs.length > 0) input = withHOCs(...hocs)(input);
      return (
        <Fragment key={field.name as any}>
          <FormGridItem md={2} {...itemProps}>
            {label}
            {!required ? null : <>&nbsp;{`*`}</>}
          </FormGridItem>
          <FormGridItem md={10} {...itemProps}>
            {render(input, inputProps)}
          </FormGridItem>
        </Fragment>
      );
    },
    [control]
  );
  return <>{fields.map(renderField as any)}</>;
}
