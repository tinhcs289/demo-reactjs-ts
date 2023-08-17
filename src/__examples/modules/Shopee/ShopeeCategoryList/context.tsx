import createFastContext from '@/helpers/contextHelpers/createFastContext';
import type { ShopeeCategoryItem } from '@/types/Shopee';
import { ReactNode, useEffect } from 'react';
import getCategories from './services/getCategories';
export type CategoriesContextValue = {
  categories: ShopeeCategoryItem[];
};
const {
  Provider,
  useStore: useCategoriesStore,
  useSetter,
} = createFastContext<CategoriesContextValue>({} as any);
export { useCategoriesStore };
function Init() {
  const set = useSetter();
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
