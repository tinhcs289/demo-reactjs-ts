import React from 'react';
import type { ILoginPageProps, TLoginFormData } from './_types';

const withLoginViaInternalApi = (WrappedComponent: React.FC<ILoginPageProps>) => (props: ILoginPageProps) => {
  const { onRequestLoginViaSSO: _, ...otherProps } = props;

  const handleRequestLoginViaApi = (formData: TLoginFormData) => {
    //TODO: logic submit to api here
  };

  return <WrappedComponent {...otherProps} onSubmitLoginForm={handleRequestLoginViaApi} />;
};
export default withLoginViaInternalApi;
