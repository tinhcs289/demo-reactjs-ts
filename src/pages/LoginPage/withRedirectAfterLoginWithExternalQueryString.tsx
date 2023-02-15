import type { ComponentType } from 'react';
import type { ILoginPageProps } from './_types';

const withRedirectAfterLoginWithExternalQueryString =
  (WrappedComponent: ComponentType<ILoginPageProps>) => (props: ILoginPageProps) => {
    //TODO [Login] logic to received query-string from external service
    return <WrappedComponent {...props} />;
  };
export default withRedirectAfterLoginWithExternalQueryString;
