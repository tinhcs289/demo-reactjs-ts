import type { TBookingSellListItem } from '@/api/booking/_types';
import createAsyncListContext from '@/functions/createAsyncListContext';
import Box from '@mui/material/Box';
import type { FC } from 'react';
import columns from './columns';
import getList from './getList';

const { AsyncListProvider, AsyncListTable, AsyncListPaging } = createAsyncListContext<TBookingSellListItem>();

const DashboardPage: FC<any> = () => {
  return (
    <Box sx={{ m: 0, p: 0 }}>
      <AsyncListProvider onQuery={getList} queryOnFirstLoad>
        <AsyncListPaging />
        <br />
        <AsyncListTable columns={columns} />
      </AsyncListProvider>
    </Box>
  );
};
export default DashboardPage;
