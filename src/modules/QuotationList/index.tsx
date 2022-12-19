import type { FC } from 'react';
import columns from './columns';
import { AsyncListPaging, AsyncListProvider, AsyncListTable, ItemAction } from './context';
import getList from './getList';

const QuotationList: FC<any> = () => {
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
export default QuotationList;
