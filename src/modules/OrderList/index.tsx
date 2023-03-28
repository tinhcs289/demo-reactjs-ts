import { CommonTableContainer } from '@/components/CommonTable';
import columns from './columns';
import DeleteConfirm from './components/DeleteConfirm';
import {
  AsyncListItemActionMenu,
  AsyncListProvider,
  AsyncListTable,
  AsyncListTablePaging,
  useAsyncListGetter,
} from './context';
import rowActions from './rowActions';
import getList from './services/getList';
function SelectedItemsCount() {
  const selectedItems = useAsyncListGetter((s) => s.selectedItems);
  const selectedItemIds = useAsyncListGetter((s) => s.selectedItemIds);
  return (
    <div>
      <span>items: {selectedItems?.length || 0}</span>
      &nbsp;--&nbsp;
      <span>ids: {selectedItemIds?.length || 0}</span>
    </div>
  );
}
export default function OrderList() {
  return (
    <AsyncListProvider onQuery={getList} queryOnFirstLoad>
      <CommonTableContainer sx={{ pb: '32px' }}>
        <SelectedItemsCount />
        <AsyncListTablePaging />
        <AsyncListTable columns={columns} />
        <AsyncListItemActionMenu actions={rowActions} />
        <DeleteConfirm />
      </CommonTableContainer>
    </AsyncListProvider>
  );
}
