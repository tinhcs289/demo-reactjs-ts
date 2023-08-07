import type { RowData, QueryParams } from './_types';
import createAsyncListContextWithComponent from '@/helpers/contextHelpers/createAsyncListContextWithComponents';
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
  AsyncListTableWithColumnVisibility,
  AsyncListTablePaging,
  AsyncListPaging,
  AsyncListItemActionsPopoverToggle,
  AsyncListItemActionsPopover,
  AsyncListItemActionsPopoverEdit,
  AsyncListItemActionsPopoverDelete,
} = context;
