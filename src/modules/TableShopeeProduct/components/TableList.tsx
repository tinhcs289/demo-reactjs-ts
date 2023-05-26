import { CommonTableContainer } from '@/components/table';
import getList from '@/modules/ShopeeProductList/services/getList';
import { actions, columns, rowHocs } from '../constants';
import { AsyncListItemActionsPopover, AsyncListPaging, AsyncListProvider, AsyncListTable } from '../context';
import DialogConfirmDelete from './DialogConfirmDelete';
import LabelSelectedItemCount from './LabelSelectedItemCount';
export default function TableList() {
  return (
    <AsyncListProvider onQuery={getList} queryOnFirstLoad>
      <CommonTableContainer sx={{ pb: '32px' }}>
        <LabelSelectedItemCount />
        <AsyncListPaging />
        <AsyncListTable
          columns={columns}
          rowHocs={rowHocs}
          // virtualized
          // rowHeight={49}
          // totalOfRowsToDisplay={10}
        />
        <AsyncListItemActionsPopover actions={actions} />
        <DialogConfirmDelete />
      </CommonTableContainer>
    </AsyncListProvider>
  );
}
