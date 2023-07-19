import { useRHFWatchValue } from '@/hooks/useRHF';
import { debounce } from 'lodash';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
export default function withRHFTurnBackToDefaultValueIfClear(fieldName: string) {
  return function withRHFTurnBackToDefaultValueIfClearHOC(WrappedComponent: ComponentType<any>) {
    return function FieldWithTurnBackToDefaultValueIfClear(props: any) {
      const {
        setValue,
        formState: { defaultValues },
      } = useFormContext();
      const fieldValue = useRHFWatchValue(fieldName);
      useEffect(() => {
        if (typeof fieldValue === 'undefined') return;
        if (fieldValue === null) return;
        if (fieldValue === '') return;
        const defaultValue = defaultValues?.[fieldName];
        if (typeof defaultValue === 'undefined') return;
        if (defaultValue === null) return;
        if (defaultValue === '') return;
        const turnBackToDefaultValueIfClear = debounce(() => {
          setValue(fieldName, defaultValue);
        }, 200);
        turnBackToDefaultValueIfClear();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return <WrappedComponent {...props} />;
    };
  };
}
