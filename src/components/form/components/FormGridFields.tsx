import { GridContainer } from '@/components/grid';
import withHOCs from '@/hocs/withHocs';
import get from 'lodash/get';
import { useCallback, useMemo } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import type { FormField, FormGridProps } from '../_types';
import { COMPONENT_DICT } from '../constants';
import FormGridItem from './FormGridItem';
function FormGridItemSubField<T extends FieldValues>(props: FormField<T, any>) {
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
  } = props;
  if (!name && inputType !== 'field-group') return null;
  if (!(_fields instanceof Array && _fields.length >= 0)) return null;
  const subFields =
    inputType === 'field-group'
      ? _fields
      : _fields.map((f) => ({
          ...f,
          name: `${name as string}.${(f?.name as string) || ''}`,
        }));
  let FormGridFieldsWithHocs = FormGridFields;
  if (hocs instanceof Array && hocs.length > 0)
    FormGridFieldsWithHocs = withHOCs(...hocs)(FormGridFieldsWithHocs) as any;
  if (inputType !== 'field-group') {
    return (
      <FormGridItem
        {...itemProps}
        key={name as any}
        contentProps={{
          container: true,
          width: '100%',
          height: '100%',
          ...itemProps?.contentProps,
        }}
      >
        <FormGridFieldsWithHocs fields={subFields} />
      </FormGridItem>
    );
  } else {
    const { xs, sm, md, lg, xl, sx, disabledXs, gridFieldHocs } = itemProps || {};
    let FieldGroupComponent = component || GridContainer;
    if (gridFieldHocs instanceof Array && gridFieldHocs.length > 0)
      FieldGroupComponent = withHOCs(...gridFieldHocs)(FieldGroupComponent as any) as any;
    return (
      <FieldGroupComponent
        {...componentProps}
        sx={{ ...componentSx, ...sx } as any}
        item
        {...(disabledXs === true ? {} : { xs: xs || 12 })}
        {...(!!sm ? { sm } : {})}
        {...(!!md ? { md } : {})}
        {...(!!lg ? { lg } : {})}
        {...(!!xl ? { xl } : {})}
      >
        <FormGridFieldsWithHocs fields={subFields} />
      </FieldGroupComponent>
    );
  }
}
function FormGridField<T extends FieldValues>(props: FormField<T, any>) {
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
  } = props;
  const { control } = useFormContext();
  if (!name && inputType !== 'field-group') return null;
  if (_fields instanceof Array && _fields.length > 0) {
    return <FormGridItemSubField {...props} />;
  }
  let Input = component;
  if (!Input) {
    if (!inputType) return null;
    Input = (COMPONENT_DICT as any)[inputType as any];
  }
  if (!Input) return null;
  const inputProps: { [x: string]: any } = {
    name,
    label,
    rules,
    control,
    ...componentProps,
  };
  if (!!componentProps?.sx || !!componentSx)
    inputProps['sx'] = { ...get(componentProps, 'sx', {}), ...componentSx };
  if (hocs instanceof Array && hocs.length > 0) Input = withHOCs(...hocs)(Input);
  return (
    <FormGridItem {...itemProps} key={name as any}>
      <Input {...inputProps} />
    </FormGridItem>
  );
}
export default function FormGridFields<T extends FieldValues>(props: FormGridProps<T>) {
  const { fields } = props;
  const renderField = useCallback((field: FormField<T, any>, index: number) => {
    const { gridFieldHocs: hocs, ..._field } = field;
    const _props = { key: index, ..._field };
    if (!(hocs instanceof Array && hocs.length > 0)) {
      return <FormGridField {...(_props as any)} />;
    }
    const FormGridFieldWithHocs = withHOCs(...hocs)(FormGridField as any);
    return <FormGridFieldWithHocs key={index} {...(_props as any)} />;
  }, []);
  const $Fields = useMemo(() => {
    if (!fields) return null;
    if (!Array.isArray(fields)) return null;
    if (fields.length === 0) return null;
    return <>{fields.map(renderField)}</>;
  }, [fields, renderField]);
  return $Fields;
}
export function FormGridFieldsWithNamePrefix<T extends FieldValues>(
  props: FormGridProps<T> & {
    namePrefix: string;
  }
) {
  const { namePrefix, fields: fieldsProp } = props;
  const fields = useMemo(
    () =>
      fieldsProp.map((f) => ({
        ...f,
        name: `${namePrefix}.${f.name as string}`,
      })),
    [fieldsProp, namePrefix]
  );
  return <FormGridFields fields={fields} />;
}
