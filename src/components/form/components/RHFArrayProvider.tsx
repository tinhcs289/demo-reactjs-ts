import type { AnyObject } from '@/types';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useFieldArray } from 'react-hook-form';
export type FieldArrayContextValues<Values extends AnyObject = AnyObject> = ReturnType<
  typeof useFieldArray<Values>
> & { name: string };
const RHFArrayContext = createContext<FieldArrayContextValues | null>(null);
export function useRHFArrayContext<Values extends AnyObject = AnyObject>() {
  return useContext(RHFArrayContext as any) as FieldArrayContextValues<Values>;
}
export type FieldArrayProviderProps<Values extends AnyObject = AnyObject> =
  FieldArrayContextValues<Values> & {
    children?: ReactNode;
  };
export default function RHFArrayProvider<Values extends AnyObject = AnyObject>(
  props: FieldArrayProviderProps<Values>
) {
  const { children, ...useFieldArrayMethods } = props;
  return <RHFArrayContext.Provider value={useFieldArrayMethods as any}>{children}</RHFArrayContext.Provider>;
}
