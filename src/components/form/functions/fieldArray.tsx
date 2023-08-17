import { FormGridFieldsWithNamePrefix, useRHFArrayContext } from '@/components/form';
import { GridContainer } from '@/components/grid';
import type { RHFRules } from '@/components/rhfInputs';
import withHOCs from '@/hocs/withHocs';
import { useRHFFieldError, useRHFFormValues, useRHFWatchValue } from '@/hooks/useRHF';
import type { AnyObject } from '@/types';
import { get } from 'lodash';
import { ComponentType, useEffect, useMemo } from 'react';
import type { FieldValues, ValidateResult } from 'react-hook-form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { FormField, FormInputType } from '../_types';
import RHFArrayProvider from '../components/RHFArrayProvider';
//#region RHF Rules
function validateArrayByRules(rules: RHFRules, value: Array<any>, formValues?: any): true | string {
  if (!rules) return true;
  let result: string = '';
  Object.keys(rules).forEach((ruleName) => {
    const message = get(rules, [ruleName, 'message'], '') as string;
    switch (ruleName as keyof RHFRules) {
      case 'required':
        if (value instanceof Array && value.length > 0) break;
        result = message;
        break;
      case 'minLength':
        if (!(value instanceof Array && value.length >= 0)) break;
        const minLength = get(rules, [ruleName, 'value'], 0) as number;
        if (value.length >= minLength) break;
        result = message;
        break;
      case 'maxLength':
        if (!(value instanceof Array && value.length >= 0)) break;
        const maxLength = get(rules, [ruleName, 'value'], 0) as number;
        if (value.length < maxLength) break;
        result = message;
        break;
      case 'validate':
        const validate = get(rules, ruleName, {}) as Required<RHFRules>['validate'];
        if (typeof validate === 'function') {
          const rs = validate(value, formValues) as ValidateResult;
          if (rs === true) break;
          result = rs as string;
          break;
        }

        if (typeof validate === 'object') {
          let rs: ValidateResult = true;
          Object.keys(validate).every((fnName) => {
            const fn = get(validate, fnName);
            if (typeof fn !== 'function') return true;
            const _rs = fn(value, formValues) as ValidateResult;
            if (_rs === true) return true;
            if (typeof _rs !== 'string') return true;
            rs = _rs;
            return false;
          });
          if (rs === true) break;
          if (typeof rs !== 'string') break;
          result = rs as string;
          break;
        }
        break;
      default:
        break;
    }
  });
  return result.length > 0 ? result : true;
}
function RHFRulesWatcher(props: { name: string; rules: RHFRules }) {
  const { name, rules } = props;
  const { setError, clearErrors } = useFormContext();
  const value = useRHFWatchValue<Array<any>>(name);
  const error = useRHFFieldError(name);
  const formValues = useRHFFormValues();
  useEffect(() => {
    if (error instanceof Array) return; // errors of items in array
    const result = validateArrayByRules(rules, value, formValues);
    if (result === true) {
      if (!error) return;
      clearErrors(name);
    }
    if (typeof result !== 'string') return;
    if (result === error?.message) return; // reduce re-render
    setError(name, { message: result });
    return;
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <></>;
}
function withRules(name: string, rules: RHFRules) {
  return function withRulesHoc(WrappedComponent: ComponentType<any>): ComponentType<any> {
    return function RHFFieldArrayWithRules(props: any) {
      const $Watcher = useMemo(() => <RHFRulesWatcher name={name} rules={rules} />, []);
      return (
        <>
          {$Watcher}
          <WrappedComponent {...props} />
        </>
      );
    };
  };
}
//#endregion
export type FieldArrayItemProps = {
  /**
   * name of FieldArray
   */
  rootName: string;
  /**
   * index of item
   */
  itemIndex: number;
  /**
   * name of item which following the format `${rootName}.${itemIndex}`, eg: 'Contacts.1'
   */
  itemName: string;
  /**
   * value of item
   */
  item: Record<'id', string>;
  /**
   * the fields config of
   */
  subFields: FormField<AnyObject, any>[];
};
function FielArrayItem(props: FieldArrayItemProps) {
  const { rootName, item, itemIndex, subFields } = props;
  return (
    <GridContainer key={item.id} sx={{ width: '100%' }}>
      <FormGridFieldsWithNamePrefix namePrefix={`${rootName}.${itemIndex}`} fields={subFields} />
    </GridContainer>
  );
}
export type FieldArrayComponentProps = {
  name: string;
  fields: FormField<AnyObject, any>[];
  itemComponent?: ComponentType<FieldArrayItemProps>;
  itemComponentHocs?: FieldArrayItemComponentHoc[];
};
function FieldArrayComponent(props: FieldArrayComponentProps) {
  const { name, fields: fieldsSub, itemComponent, itemComponentHocs } = props;
  const { fields: fieldArray } = useRHFArrayContext();
  let ItemComponent = FielArrayItem as ComponentType<FieldArrayItemProps>;
  if (!!itemComponent) ItemComponent = itemComponent;
  if (itemComponentHocs instanceof Array && itemComponentHocs.length > 0) {
    ItemComponent = withHOCs(...itemComponentHocs)(ItemComponent);
  }
  return fieldArray.map((item, index) => (
    <ItemComponent
      key={item.id}
      rootName={name}
      item={item}
      itemIndex={index}
      itemName={`${name}.${index}`}
      subFields={fieldsSub}
    />
  ));
}
function withFieldArrayContext(name: string) {
  return function withFieldArrayContextHoc(WrappedComponent: ComponentType<any>): ComponentType<any> {
    return function RHFFieldArray(props: any) {
      const { control } = useFormContext();
      const fieldArray = useFieldArray({ control, name });
      return (
        <RHFArrayProvider {...({ name, ...fieldArray } as any)}>
          <WrappedComponent {...props} />
        </RHFArrayProvider>
      );
    };
  };
}
export type FieldArrayItemComponentHoc = (
  WrappedComponent: ComponentType<FieldArrayItemProps>
) => ComponentType<FieldArrayItemProps>;
export default function fieldArray<T extends FieldValues, U extends FormInputType>(
  args: Omit<FormField<T, U>, 'component' | 'componentProps'> & {
    component?: ComponentType<FieldArrayComponentProps>;
    componentProps?: FieldArrayComponentProps;
    itemComponent?: ComponentType<FieldArrayItemProps>;
    itemComponentHocs?: FieldArrayItemComponentHoc[];
  }
): FormField<T, U> {
  const { fields, itemComponent, itemComponentHocs, ...otherArgs } = args;
  const gridFieldHocs = [
    withFieldArrayContext(args?.name as string),
    ...(!!args?.name && !!args?.rules && Object.keys(args.rules).length > 0
      ? [withRules(args.name as string, args.rules)]
      : []),
    ...(args?.gridFieldHocs || []),
  ];
  return {
    ...otherArgs,
    component: args?.component || (FieldArrayComponent as any),
    componentProps: {
      ...args?.componentProps,
      name: args?.name as string,
      fields,
      itemComponent: itemComponent,
      itemComponentHocs: itemComponentHocs,
    } as any,
    gridFieldHocs,
  };
}
