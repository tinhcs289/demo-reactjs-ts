import type { FC } from 'react';
import columns from './columns';
import { AsyncListPaging, AsyncListProvider, AsyncListTable, ItemAction } from './context';
import getList from './getList';

const __module__List: FC<any> = () => {
  return (
    <>
      <AsyncListProvider onQuery={getList} queryOnFirstLoad>
        <AsyncListPaging />
        <br />
        <ItemAction />
        <AsyncListTable columns={columns} />
      </AsyncListProvider>
    </>
  );
};
export default __module__List;
