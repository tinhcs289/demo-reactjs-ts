import createFastContext from '@/functions/createFastContext';
import getCategories from '@/modules/ShopeeProductList/services/getCategories';
import type { TShopeeCategoryItem } from '@/modules/ShopeeProductList/_types';
import { ReactNode, useEffect } from 'react';

export type CategoriesContextValue = {
  categories: TShopeeCategoryItem[];
};

const { Provider, useStore: useCategoriesStore } = createFastContext<CategoriesContextValue>({} as any);

export { useCategoriesStore };

function Init() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, set] = useCategoriesStore((s) => s?.categories);

  useEffect(() => {
    getCategories().then((categories) => {
      set({ categories });
    });
  }, [set]);

  return <></>;
}

export default function CategoriesProvider(props?: { children?: ReactNode }) {
  return (
    <Provider>
      <Init />
      {props?.children}
    </Provider>
  );
}
