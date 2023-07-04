import { useMemo } from 'react';
import type { FormComponent, FormProps } from '../_types';
import { defaultValues } from '../constants';
export default function withDefaultValues(WrappedComponent: FormComponent): FormComponent {
  return function FormWithDefaultValues(props: FormProps) {
    const { defaultValues: defaultValuesProp, ...otherProps } = props;
    const defaultValuesMemo = useMemo(
      () => ({ ...defaultValues, ...defaultValuesProp }),
      [defaultValuesProp]
    );
    return <WrappedComponent {...otherProps} defaultValues={defaultValuesMemo} />;
  };
}
