import { http, interceptors } from '@/api';
import store from '@/redux/store';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
interceptors(http);
export default function ReduxProvider(props: { children?: ReactNode }) {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
}
