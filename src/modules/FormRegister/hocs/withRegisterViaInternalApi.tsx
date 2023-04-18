import type { ComponentType } from 'react';
import type { FormProps, FormValues } from '../_types';
export default function withRegisterViaInternalApi(WrappedComponent: ComponentType<FormProps>) {
  return function FormRegisterWithApi(props: FormProps) {
    const { onSubmit: _, ...otherProps } = props;
    const handleRequestRegisterViaApi = (values: FormValues) => {
      //TODO [Register] register submit to api here
    };
    return <WrappedComponent {...otherProps} onSubmit={handleRequestRegisterViaApi as any} />;
  };
}
