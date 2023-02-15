import useReturnUrlHash from '@/hooks/useReturnUrlHash';
import type { ComponentType } from 'react';
import type { ILoginPageProps } from './_types';

const withReturnUri = (WrappedComponent: ComponentType<ILoginPageProps>) => (props: ILoginPageProps) => {
  const { returnUri: returnUriProp, ...otherProps } = props;
  const returnUri = useReturnUrlHash() || returnUriProp;
  return <WrappedComponent {...otherProps} returnUri={returnUri} />;
};
export default withReturnUri;
