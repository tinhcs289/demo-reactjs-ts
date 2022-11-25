import React from 'react';
import type { ILoginPageProps } from './_types';

const withRedirectAfterLoginWithExternalQueryString =
  (WrappedComponent: React.FC<ILoginPageProps>) => (props: ILoginPageProps) => {
    //TODO logic to received query-string from external service
    return <WrappedComponent {...props} />;
  };
export default withRedirectAfterLoginWithExternalQueryString;
