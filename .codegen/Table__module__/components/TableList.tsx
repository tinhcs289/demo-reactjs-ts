//@ts-nocheck --entire-file
import { CommonTableContainer } from '@/components/table';
import { actions, columns, rowHocs } from '../constants';
import {
  AsyncListItemActionsPopover,
  AsyncListProvider,
  AsyncListTable,
  AsyncListTablePaging,
} from '../context';
import { getList } from '../services';
import DialogConfirmDelete from './DialogConfirmDelete';
export default function TableList() {
  return (
    <AsyncListProvider onQuery={getList} queryOnFirstLoad>
      <CommonTableContainer sx={{ pb: '32px' }}>
        <AsyncListTablePaging />
        <AsyncListTable columns={columns} rowHocs={rowHocs} />
        <AsyncListItemActionsPopover actions={actions} />
        <DialogConfirmDelete />
      </CommonTableContainer>
    </AsyncListProvider>
  );
}
