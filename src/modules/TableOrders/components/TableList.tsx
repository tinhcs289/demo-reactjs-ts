import { CommonTableContainer } from '@/components/table';
import { actions, columns } from '../constants';
import { AsyncListItemActionMenu, AsyncListProvider, AsyncListTable, AsyncListTablePaging } from '../context';
import { getList } from '../services';
import DialogConfirmDelete from './DialogConfirmDelete';
import LabelSelectedItemCount from './LabelSelectedItemCount';
export default function TableList() {
  return (
    <AsyncListProvider onQuery={getList} queryOnFirstLoad>
      <CommonTableContainer sx={{ pb: '32px' }}>
        <LabelSelectedItemCount />
        <AsyncListTablePaging />
        <AsyncListTable columns={columns} />
        <AsyncListItemActionMenu actions={actions} />
        <DialogConfirmDelete />
      </CommonTableContainer>
    </AsyncListProvider>
  );
}
