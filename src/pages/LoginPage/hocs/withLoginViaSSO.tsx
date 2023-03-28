import type { ComponentType } from 'react';
import type { LoginPageProps, LoginFormData } from '../_types';
export default function withLoginViaSSO(WrappedComponent: ComponentType<LoginPageProps>) {
  return function LoginPageWithLoginViaSSO(props: LoginPageProps) {
    const { onRequestLoginViaSSO: _, ...otherProps } = props;
    const handleRequestLoginViaSSO = (formData: LoginFormData) => {
      //TODO [Login] logic sso here
    };
    return <WrappedComponent {...otherProps} onRequestLoginViaSSO={handleRequestLoginViaSSO} />;
  };
}
