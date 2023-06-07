import withHOCs from '@/hocs/withHocs';
import get from 'lodash/get';
import { Fragment, useCallback } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { TextWithRequiredMark } from '../../typo';
import type { FormField, FormGridProps } from '../_types';
import { COMPONENT_DICT } from '../constants';
import FormGridFields from './FormGridFields';
import FormGridItem from './FormGridItem';
function FormGridSubFieldsVertical<T extends FieldValues>(props: FormField<T, any>) {
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
  } = props;
  if (!name) return null;
  const required = !!rules?.required;
  if (!(_fields instanceof Array && _fields.length > 0)) return null;
  const subFields = _fields.map((f) => ({ ...f, name: `${name as string}.${(f?.name as string) || ''}` }));
  let FormGridFieldsWithHocs = FormGridFields;
  if (hocs instanceof Array && hocs.length > 0) {
    FormGridFieldsWithHocs = withHOCs(...hocs)(FormGridFieldsWithHocs) as any;
  }
  return (
    <Fragment key={name as any}>
      <FormGridItem md={2} {...itemProps}>
        <TextWithRequiredMark required={required}>{label}</TextWithRequiredMark>
      </FormGridItem>
      <FormGridItem
        md={10}
        {...itemProps}
        contentProps={{ container: true, width: '100%', height: '100%', ...itemProps?.contentProps }}
      >
        <FormGridFieldsWithHocs fields={subFields} />
      </FormGridItem>
    </Fragment>
  );
}
function FormGridFieldVertical<T extends FieldValues>(props: FormField<T, any>) {
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
  } = props;
  const { control } = useFormContext();
  if (!name) return null;
  const required = !!rules?.required;
  if (_fields instanceof Array && _fields.length >= 0) {
    return <FormGridSubFieldsVertical {...props} />;
  }
  let Input = component;
  if (!Input) {
    if (!inputType) return null;
    Input = (COMPONENT_DICT as any)[inputType as any];
  }
  if (!Input) return null;
  const inputProps: { [x: string]: any } = { name, rules, control, ...componentProps };
  if (!!componentProps?.sx || !!componentSx)
    inputProps['sx'] = {
      ...get(componentProps, 'sx', {}),
      ...componentSx,
    };
  if (hocs instanceof Array && hocs.length > 0) Input = withHOCs(...hocs)(Input);
  return (
    <Fragment key={name as any}>
      <FormGridItem md={2} {...itemProps}>
        <TextWithRequiredMark required={required}>{label}</TextWithRequiredMark>
      </FormGridItem>
      <FormGridItem md={10} {...itemProps}>
        <Input {...(inputProps as any)} />
      </FormGridItem>
    </Fragment>
  );
}
export default function FormGridFieldsVertical<T extends FieldValues>(props: FormGridProps<T>) {
  const { fields } = props;
  const renderField = useCallback((field: FormField<T, any>) => {
    const { gridFieldHocs: hocs, ..._field } = field;
    const _props = { key: _field.name, ..._field };
    if (!(hocs instanceof Array && hocs.length > 0)) {
      return <FormGridFieldVertical {...(_props as any)} />;
    }
    const FormGridFieldWithHocs = withHOCs(...hocs)(FormGridFieldVertical as any);
    return <FormGridFieldWithHocs {...(_props as any)} />;
  }, []);
  return <>{fields.map(renderField as any)}</>;
}
