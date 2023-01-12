import createFastContext from '@/functions/createFastContext';
import getCategories from '@/modules/ShopeeInfiniteList/services/getCategories';
import type { TShopeeCategoryItem } from '@/modules/ShopeeInfiniteList/_types';
import { ReactNode, useEffect } from 'react';

export type CategoriesContextValue = {
  categories: TShopeeCategoryItem[];
};

const { Provider, useStore: useCategoriesStore } = createFastContext<CategoriesContextValue>({} as any);

function CategoriesInit() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCat] = useCategoriesStore((s) => s?.categories);

  useEffect(() => {
    getCategories().then((categories) => {
      setCat({ categories });
    });
  }, [setCat]);

  return <></>;
}

function CategoriesProvider(props?: { children?: ReactNode }) {
  return (
    <Provider>
      <CategoriesInit />
      {props?.children}
    </Provider>
  );
}

export { CategoriesProvider, useCategoriesStore };
