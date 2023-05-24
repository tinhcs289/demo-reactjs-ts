import createAsyncListContextWithComponent from '@/functions/createAsyncListContextWithComponents';
import type { RowData } from './_types';
const context = createAsyncListContextWithComponent<RowData>({ idField: 'itemid', pageSize: 60 });
export const {
  AsyncListProvider,
  useAsyncListAction,
  useAsyncListSetter,
  useAsyncListGetter,
  useAsyncListInteract,
  AsyncListTable,
  AsyncListPaging,
  AsyncListItemActionsPopoverToggle,
  AsyncListItemActionsPopover,
  AsyncListItemActionsPopoverEdit,
  AsyncListItemActionsPopoverDelete,
} = context;
