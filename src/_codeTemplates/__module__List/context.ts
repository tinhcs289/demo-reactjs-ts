import type { T__module__ListItem } from './_types';
import createAsyncListContextWithComponent from '@/functions/createAsyncListContextWithComponent';

const context = createAsyncListContextWithComponent<T__module__ListItem>();

export const {
  AsyncListProvider,
  useAsyncList,
  AsyncListTable,
  AsyncListPaging,
  ListItemActionMenuToggle,
  ListItemActionMenu,
  ListItemActionEdit,
  ListItemActionDelete,
} = context;
