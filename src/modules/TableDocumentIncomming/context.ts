import type { RowData, QueryParams } from './_types';
import createAsyncListContextWithComponent from '@/functions/createAsyncListContextWithComponents';
const context = createAsyncListContextWithComponent<RowData, QueryParams>({
  idField: 'Id',
});
export const {
  AsyncListProvider,
  useAsyncListAction,
  useAsyncListSetter,
  useAsyncListGetter,
  useAsyncListInteract,
  AsyncListTable,
  AsyncListTablePaging,
  AsyncListItemActionsPopoverToggle,
  AsyncListItemActionsPopover,
  AsyncListItemActionsPopoverEdit,
  AsyncListItemActionsPopoverDelete,
} = context;
