import { CommonTableContainer } from '@/components/CommonTable';
import type { FC } from 'react';
import columns from './columns';
import DeleteConfirm from './components/DeleteConfirm';
import { AsyncListProvider, AsyncListTable, AsyncListTablePaging, ListItemActionMenu } from './context';
import rowActions from './rowActions';
import getList from './services/getList';

const OrderList: FC<any> = () => {
  return (
    <AsyncListProvider onQuery={getList} queryOnFirstLoad>
      <CommonTableContainer sx={{ pb: '32px' }}>
        <AsyncListTablePaging />
        <ListItemActionMenu actions={rowActions} />
        <AsyncListTable columns={columns} />
      </CommonTableContainer>
      <DeleteConfirm />
    </AsyncListProvider>
  );
};
export default OrderList;
