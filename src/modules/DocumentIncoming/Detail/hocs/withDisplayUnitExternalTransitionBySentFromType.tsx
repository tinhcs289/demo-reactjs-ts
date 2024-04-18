import type { RadioGroupOption } from '@/components/rhfInputs/RHFRadioGroup';
import { useMemo, type ComponentType } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
export default function withDisplayUnitExternalTransitionBySentFromType(
  WrappedComponent: ComponentType<any>
): ComponentType<any> {
  return function GridItemWithDisplayUnitExternalTransitionBySentFromType(props) {
    const { control } = useFormContext();
    const refValue = useWatch({ name: 'SentFromType', control }) as RadioGroupOption | undefined;
    const shouldShow = useMemo(() => refValue?.value === 'EXTERNAL_TRANSITION', [refValue?.value]);
    return !!shouldShow ? <WrappedComponent {...props} /> : null;
  };
}
