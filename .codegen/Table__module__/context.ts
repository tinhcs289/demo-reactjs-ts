//@ts-nocheck --entire-file
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
  AsyncListItemActionsPopoverToggle,
  AsyncListItemActionsPopover,
  AsyncListItemActionsPopoverEdit,
  AsyncListItemActionsPopoverDelete,
} = context;
