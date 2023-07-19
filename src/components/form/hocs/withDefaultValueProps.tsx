import type { ComponentType } from 'react';
import { useMemo } from 'react';
export default function withDefaultValueProps(defaultValues: any) {
  return function withDefaultValuesHOC(WrappedComponent: ComponentType<any>): ComponentType<any> {
    return function FormWithDefaultValues(props: any) {
      const { defaultValues: defaultValuesProp, ...otherProps } = props;
      const defaultValuesMemo = useMemo(
        () => ({ ...defaultValues, ...defaultValuesProp }),
        [defaultValuesProp]
      );
      return <WrappedComponent {...otherProps} defaultValues={defaultValuesMemo} />;
    };
  };
}
