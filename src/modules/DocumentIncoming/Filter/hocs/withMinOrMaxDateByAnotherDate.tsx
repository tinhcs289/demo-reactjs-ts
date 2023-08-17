import { RHFDateProps } from '@/components/rhfInputs/RHFDate';
import { useRHFWatchValue } from '@/hooks/useRHF';
import type { Moment } from 'moment';
import moment from 'moment';
import type { ComponentType } from 'react';
import { useMemo } from 'react';
export default function withMinOrMaxDateByAnotherDate(type: 'maxDate' | 'minDate', dependFieldName: string) {
  return function withMinOrMaxDateByAnotherDateHOC(
    WrappedComponent: ComponentType<RHFDateProps>
  ): ComponentType<RHFDateProps> {
    return function FieldWithMinOrMaxDateByAnotherDate(props: RHFDateProps) {
      const otherDate = useRHFWatchValue(dependFieldName) as Moment | null | undefined;
      const minOrMax: Partial<RHFDateProps> = useMemo(() => {
        if (!moment.isMoment(otherDate)) return {};
        if (type !== 'maxDate' && type !== 'minDate') return {};
        return { [type]: otherDate };
      }, [otherDate]);
      return <WrappedComponent {...{ ...props, ...minOrMax }} />;
    };
  };
}
