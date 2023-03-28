import type { ComponentType } from 'react';
import type { LoginPageProps } from '../_types';
export default function withRedirectAfterLoginWithExternalQueryString(
  WrappedComponent: ComponentType<LoginPageProps>
) {
  return function LoginPageWithRedirectAfterLoginWithExternalQueryString(props: LoginPageProps) {
    //TODO [Login] logic to received query-string from external service
    return <WrappedComponent {...props} />;
  };
}
