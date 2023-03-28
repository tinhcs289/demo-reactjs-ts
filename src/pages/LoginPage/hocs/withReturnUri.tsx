import useReturnUrlHash from '@/hooks/useReturnUrlHash';
import type { ComponentType } from 'react';
import type { LoginPageProps } from '../_types';
export default function withReturnUri(WrappedComponent: ComponentType<LoginPageProps>) {
  return function LoginPageWithReturnUri(props: LoginPageProps) {
    const { returnUri: returnUriProp, ...otherProps } = props;
    const returnUri = useReturnUrlHash() || returnUriProp;
    return <WrappedComponent {...otherProps} returnUri={returnUri} />;
  };
}
