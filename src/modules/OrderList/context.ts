import type { TOrderListItem } from './_types';
import createAsyncListContextWithComponent from '@/functions/createAsyncListContext2WithComponents';
const context = createAsyncListContextWithComponent<TOrderListItem>();
export const {
  AsyncListProvider,
  useAsyncListAction,
  useAsyncListSetter,
  useAsyncListGetter,
  useAsyncListInteract,
  AsyncListTable,
  AsyncListTablePaging,
  AsyncListItemActionMenu,
  AsyncListItemActionMenuToggle,
  AsyncListItemActionMenuEdit,
  AsyncListItemActionMenuDelete,
} = context;
