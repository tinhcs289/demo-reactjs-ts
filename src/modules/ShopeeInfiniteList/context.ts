import type { TShopeeProductItem } from './_types';
import createAsyncListContext from '@/functions/createAsyncListContext';

const context = createAsyncListContext<TShopeeProductItem>();

export const {
  AsyncListProvider,
  useAsyncList,
} = context;
