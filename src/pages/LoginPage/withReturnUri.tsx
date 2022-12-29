import useReturnUrlHash from '@/hooks/useReturnUrlHash';
import type { FC } from 'react';
import type { ILoginPageProps } from './_types';

const withReturnUri = (WrappedComponent: FC<ILoginPageProps>) => (props: ILoginPageProps) => {
  const { returnUri: returnUriProp, ...otherProps } = props;
  const returnUri = useReturnUrlHash() || returnUriProp;
  return <WrappedComponent {...otherProps} returnUri={returnUri} />;
};
export default withReturnUri;
