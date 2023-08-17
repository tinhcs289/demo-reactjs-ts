import createFastContext from '@/helpers/contextHelpers/createFastContext';
import type { ShopeePromoBrandItem } from '@/types/Shopee';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import getPromoBrands from './services/getPromoBrands';
export type PromoBrandsContextValue = {
  shops: ShopeePromoBrandItem[];
};
const {
  Provider,
  useStore: usePromoBrandsStore,
  useSetter,
  useGetter: usePromoBrandState,
} = createFastContext<PromoBrandsContextValue>({} as any);
export { usePromoBrandsStore, usePromoBrandState };
function Init() {
  const set = useSetter();
  useEffect(() => {
    getPromoBrands().then((shops) => {
      set({ shops });
    });
  }, [set]);
  return <></>;
}
export default function PromoBrandsProvider(props?: { children?: ReactNode }) {
  return (
    <Provider>
      <Init />
      {props?.children}
    </Provider>
  );
}
