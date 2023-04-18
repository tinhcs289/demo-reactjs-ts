import type { ComponentType } from 'react';
import type { FormProps, FormValues } from '../_types';
export default function withLoginViaSSO(WrappedComponent: ComponentType<FormProps>) {
  return function FormLoginWithLoginViaSSO(props: FormProps) {
    const { onRequestLoginViaSSO: _, ...otherProps } = props;
    const handleRequestLoginViaSSO = (formData: FormValues) => {
      //TODO [Login] logic sso here
    };
    return <WrappedComponent {...otherProps} onRequestLoginViaSSO={handleRequestLoginViaSSO} />;
  };
}
