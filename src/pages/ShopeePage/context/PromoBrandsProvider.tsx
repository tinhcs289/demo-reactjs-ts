import createFastContext from '@/functions/createFastContext';
import getPromoBrands from '@/modules/ShopeeProductList/services/getPromoBrands';
import type { TShopeePromoBrandItem } from '@/modules/ShopeeProductList/_types';
import { ReactNode, useEffect } from 'react';

export type PromoBrandsContextValue = {
  shops: TShopeePromoBrandItem[];
};

const { Provider, useStore: usePromoBrandsStore } = createFastContext<PromoBrandsContextValue>({} as any);

export { usePromoBrandsStore };

function Init() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, set] = usePromoBrandsStore((s) => s?.shops);

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
