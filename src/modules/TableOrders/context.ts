import type { RowData } from './_types';
import createAsyncListContextWithComponent from '@/functions/createAsyncListContextWithComponents';
const context = createAsyncListContextWithComponent<RowData>();
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
