import PATHS from '@/routes/paths';
import React from 'react';
import type { ILoginPageProps, TLoginFormData } from './_types';

//TODO: need more work to do here:
// call request api to login,
// if request success, store `access token` to browser cookie.
// reload login page
// on page load of `AppRouter`, query `access token` from browser cookie
// if token exsists, render private routes, if not, render public and auth routes.
const redirectToNextPage = () => {
  if (!(!!window && !!window?.location && typeof window.location.replace === 'function')) return;

  window.location.replace(PATHS.dashboard);
};

const withLoginViaInternalApi = (WrappedComponent: React.FC<ILoginPageProps>) => (props: ILoginPageProps) => {
  const { onRequestLoginViaSSO: _, ...otherProps } = props;

  const handleRequestLoginViaApi = (formData: TLoginFormData) => {
    //TODO: logic submit to api here
    redirectToNextPage();
  };

  return <WrappedComponent {...otherProps} onSubmitLoginForm={handleRequestLoginViaApi} />;
};
export default withLoginViaInternalApi;
