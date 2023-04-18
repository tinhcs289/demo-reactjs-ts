import type { ComponentType } from 'react';
import type { FormProps } from '../_types';
export default function withRedirectAfterLoginWithExternalQueryString(
  WrappedComponent: ComponentType<FormProps>
) {
  return function FormLoginWithRedirectAfterLoginWithExternalQueryString(props: FormProps) {
    //TODO [Login] logic to received query-string from external service
    return <WrappedComponent {...props} />;
  };
}
