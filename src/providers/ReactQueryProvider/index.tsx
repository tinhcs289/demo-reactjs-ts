import type { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import queryClient from './queryClient';
export default function ReactQueryProvider(props: { children?: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{props?.children}</QueryClientProvider>;
}
