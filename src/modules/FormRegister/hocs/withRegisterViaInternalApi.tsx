import type { CommomFormOnSubmit } from '@/types';
import type { ComponentType } from 'react';
import { useCallback } from 'react';
import type { FormProps, FormValues } from '../_types';
export default function withRegisterViaInternalApi(WrappedComponent: ComponentType<FormProps>) {
  return function FormRegisterWithApi(props: FormProps) {
    const { onSubmit, ...otherProps } = props;
    const handleRequestRegisterViaApi: CommomFormOnSubmit<FormValues> = useCallback(
      (values: FormValues) => {
        //TODO [Register] register submit to api here
        // then pass values to onSubmit
        onSubmit?.(values);
      },
      [onSubmit]
    );
    return <WrappedComponent {...otherProps} onSubmit={handleRequestRegisterViaApi as any} />;
  };
}
