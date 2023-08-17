import type { ComponentType } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
export default function withDisplayBySwitch(WrappedComponent: ComponentType<any>): ComponentType<any> {
  return function FieldWithDisplayBySwitch(props: any) {
    const { control } = useFormContext();
    const shouldDisplay = useWatch({ name: 'SwitchField', control }) as boolean;
    return !shouldDisplay ? <WrappedComponent {...props} /> : null;
  };
}
