import type { ComponentType } from 'react';
import type { ILoginPageProps, TLoginFormData } from '../_types';

const withLoginViaSSO = (WrappedComponent: ComponentType<ILoginPageProps>) => (props: ILoginPageProps) => {
  const { onRequestLoginViaSSO: _, ...otherProps } = props;

  const handleRequestLoginViaSSO = (formData: TLoginFormData) => {
    //TODO [Login] logic sso here
  };

  return <WrappedComponent {...otherProps} onRequestLoginViaSSO={handleRequestLoginViaSSO} />;
};
export default withLoginViaSSO;
