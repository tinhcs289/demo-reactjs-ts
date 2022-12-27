import type { FC } from 'react';
import columns from './columns';
import { AsyncListPaging, AsyncListProvider, AsyncListTable, ListItemActionMenu } from './context';
import getList from './services/getList';
import rowActions from './rowActions';

const __module__List: FC<any> = () => {
  return (
    <AsyncListProvider onQuery={getList} queryOnFirstLoad>
      <AsyncListPaging />
      <br />
      <ListItemActionMenu actions={rowActions} />
      <AsyncListTable columns={columns} />
    </AsyncListProvider>
  );
};
export default __module__List;
