import type { TBookingSellListItem } from '@/api/booking/_types';
import CommonTable, { tableConfig } from '@/components/CommonTable';
import CommonPagination from '@/components/CommonTable/components/CommonPagination';
import type { TBodyCellInnerRenderFunction } from '@/components/CommonTable/_types';
import toCurrencyFormat from '@/helpers/stringHelpers/toCurrencyFormat';
import useListState from '@/hooks/useListState';
import Box from '@mui/material/Box';
import { FC, useCallback, useMemo } from 'react';
import getList from './getList';

const bookingCodeRender: TBodyCellInnerRenderFunction<TBookingSellListItem> = ({ row }) => (
  <b>{row?.bookingCode || ''}</b>
);

const totalPriceRender: TBodyCellInnerRenderFunction<TBookingSellListItem> = ({ row }) =>
  toCurrencyFormat(row?.totalPrice);

const config = tableConfig<TBookingSellListItem>(
  { field: 'bookingCode', headCell: 'Mã', bodyCellInner: bookingCodeRender },
  { field: 'name', headCell: 'Đơn hàng' },
  { field: 'totalPassenger', headCell: 'Hành khách' },
  { field: 'totalPrice', headCell: 'Thành tiền', bodyCellInner: totalPriceRender },
);

const DashboardPage: FC<any> = (props) => {
  const {
    state: {
      data,
      listState: { pageIndex, pageSize, totalCount },
      isCheckAll,
      isSelected,
    },
    control: { updatePaging, checkAllItems, checkOneItem },
  } = useListState({ onQuery: getList, queryOnFirstLoad: true });

  const handleChangePage = useCallback(
    (page: number) => {
      updatePaging(page, 10);
    },
    [updatePaging],
  );

  const selectable = useMemo(() => {
    return {
      isCheckAll,
      onCheckAll: checkAllItems,
      onCheckRow: checkOneItem,
      isRowSelected: isSelected,
    };
  }, [isCheckAll, checkAllItems, checkOneItem, isSelected]);

  return (
    <Box sx={{ m: 0, p: 0 }}>
      <CommonPagination pageIndex={pageIndex} pageSize={pageSize} totalCount={totalCount} onChange={handleChangePage} />
      <br />
      <CommonTable rows={data} config={config} selectable={selectable} />
    </Box>
  );
};
export default DashboardPage;
