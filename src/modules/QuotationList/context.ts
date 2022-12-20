import type { TQuotationListItem } from './_types';
import createAsyncListContext from '@/functions/createAsyncListContext';

const { AsyncListProvider, AsyncListTable, AsyncListPaging, ActionCell, ItemAction } =
  createAsyncListContext<TQuotationListItem>();

export { AsyncListProvider, AsyncListTable, AsyncListPaging, ActionCell, ItemAction };
