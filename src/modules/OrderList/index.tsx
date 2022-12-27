import type { FC } from 'react';
import columns from './columns';
import DeleteConfirm from './components/DeleteConfirm';
import { AsyncListProvider, AsyncListTable, AsyncListTablePaging, ListItemActionMenu } from './context';
import rowActions from './rowActions';
import getList from './services/getList';

const OrderList: FC<any> = () => {
  return (
    <AsyncListProvider onQuery={getList} queryOnFirstLoad>
      <AsyncListTablePaging />
      <ListItemActionMenu actions={rowActions} />
      <AsyncListTable columns={columns} />
      <DeleteConfirm />
    </AsyncListProvider>
  );
};
export default OrderList;
