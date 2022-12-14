import type { TBookingSellListItem } from '@/api/booking/_types';
import CommonTable from '@/components/CommonTable';
import CommonPagination from '@/components/CommonTable/components/CommonPagination';
import createListContext from '@/functions/createListContext';
import Box from '@mui/material/Box';
import { FC, useCallback, useMemo } from 'react';
import columns from './columns';
import getList from './getList';

const { ListProvider, useList } = createListContext<TBookingSellListItem>();

const ListTable: FC<any> = () => {
  const [data] = useList((s) => s.data);
  const [isCheckAll] = useList((s) => s.isCheckAll);
  const [isSelected] = useList((s) => s.isSelected);
  const [checkAllItems] = useList((s) => s.control?.checkAllItems);
  const [checkOneItem] = useList((s) => s.control?.checkOneItem);

  const selectable = useMemo(() => {
    return {
      isCheckAll,
      onCheckAll: checkAllItems,
      onCheckRow: checkOneItem,
      isRowSelected: isSelected,
    };
  }, [isCheckAll, checkAllItems, checkOneItem, isSelected]);

  return <CommonTable rows={data} columns={columns} selectable={selectable} />;
};

const ListPaging: FC<any> = () => {
  const [pageIndex] = useList((s) => s.listState.pageIndex);
  const [pageSize] = useList((s) => s.listState.pageSize);
  const [totalCount] = useList((s) => s.listState.totalCount);
  const [updatePaging] = useList((s) => s.control?.updatePaging);

  const handleChangePage = useCallback(
    (page: number) => {
      updatePaging?.(page, 10);
    },
    [updatePaging],
  );

  return (
    <CommonPagination pageIndex={pageIndex} pageSize={pageSize} totalCount={totalCount} onChange={handleChangePage} />
  );
};

const DashboardPage: FC<any> = () => {
  return (
    <Box sx={{ m: 0, p: 0 }}>
      <ListProvider onQuery={getList} queryOnFirstLoad>
        <ListPaging />
        <br />
        <ListTable />
      </ListProvider>
    </Box>
  );
};
export default DashboardPage;
