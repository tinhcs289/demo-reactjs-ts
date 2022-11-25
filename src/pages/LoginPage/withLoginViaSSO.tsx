import React from 'react';
import type { ILoginPageProps, TLoginFormData } from './_types';

const withLoginViaSSO = (WrappedComponent: React.FC<ILoginPageProps>) => (props: ILoginPageProps) => {
  const { onRequestLoginViaSSO: _, ...otherProps } = props;

  const handleRequestLoginViaSSO = (formData: TLoginFormData) => {
    //TODO: logic sso here
  };

  return <WrappedComponent {...otherProps} onRequestLoginViaSSO={handleRequestLoginViaSSO} />;
};
export default withLoginViaSSO;
