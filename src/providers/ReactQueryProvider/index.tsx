import type { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import queryClient from './queryClient';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
export default function ReactQueryProvider(props: { children?: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {props?.children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
