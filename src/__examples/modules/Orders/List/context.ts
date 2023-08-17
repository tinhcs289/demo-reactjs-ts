import type { RowData } from './_types';
import createAsyncListContextWithComponent from '@/helpers/contextHelpers/createAsyncListContextWithComponents';
const context = createAsyncListContextWithComponent<RowData>();
export const {
  AsyncListProvider,
  useAsyncListAction,
  useAsyncListSetter,
  useAsyncListGetter,
  useAsyncListInteract,
  AsyncListTable,
  AsyncListTablePaging,
  AsyncListPaging,
  AsyncListItemActionsPopoverToggle,
  AsyncListItemActionsPopover,
  AsyncListItemActionsPopoverEdit,
  AsyncListItemActionsPopoverDelete,
  AsyncListTableWithColumnVisibility,
} = context;
