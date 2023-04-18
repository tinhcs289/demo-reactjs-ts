import useReturnUrlHash from '@/hooks/useReturnUrlHash';
import type { ComponentType } from 'react';
import type { FormProps } from '../_types';
export default function withReturnUri(WrappedComponent: ComponentType<FormProps>) {
  return function FormLoginWithReturnUri(props: FormProps) {
    const { returnUri: returnUriProp, ...otherProps } = props;
    const returnUri = useReturnUrlHash() || returnUriProp;
    return <WrappedComponent {...otherProps} returnUri={returnUri} />;
  };
}
