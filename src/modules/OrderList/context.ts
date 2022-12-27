import type { TOrderListItem } from './_types';
import createAsyncListContextWithComponent from '@/functions/createAsyncListContextWithComponent';

const context = createAsyncListContextWithComponent<TOrderListItem>();

export const {
  AsyncListProvider,
  useAsyncList,
  AsyncListTable,
  AsyncListPaging,
  AsyncListTablePaging,
  ListItemActionMenuToggle,
  ListItemActionMenu,
  ListItemActionEdit,
  ListItemActionDelete,
} = context;
