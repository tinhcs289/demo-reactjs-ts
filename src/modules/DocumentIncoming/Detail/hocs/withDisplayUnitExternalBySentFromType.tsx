import type { RadioGroupOption } from '@/components/rhfInputs/RHFRadioGroup';
import { useMemo, type ComponentType } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
export default function withDisplayUnitExternalBySentFromType(
  WrappedComponent: ComponentType<any>
): ComponentType<any> {
  return function GridItemWithDisplayUnitExternalBySentFromType(props) {
    const { control } = useFormContext();
    const refValue = useWatch({ name: 'SentFromType', control }) as RadioGroupOption | undefined;
    const shouldShow = useMemo(() => refValue?.value === 'EXTERNAL', [refValue?.value]);
    return !!shouldShow ? <WrappedComponent {...props} /> : null;
  };
}
