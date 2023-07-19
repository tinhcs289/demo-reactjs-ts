import { CommonTableContainer } from '@/components/table';
import ListActions from './ListActions';
import { actions, columns, rowHocs } from '../constants';
import {
  AsyncListItemActionsPopover,
  AsyncListProvider,
  AsyncListTable,
  AsyncListTablePaging,
} from '../context';
import { getList } from '../services';
import DialogConfirmDelete from './DialogConfirmDelete';
import FormFilter from './FormFilter';
import { GridContainer } from '@/components/grid';
export default function TableList() {
  return (
    <AsyncListProvider onQuery={getList} queryOnFirstLoad idField="Id" defaultSelectable={false}>
      <GridContainer alignItems="center">
        <ListActions item xs={12} mb={1} />
        <FormFilter item xs={12} mb={1} />
      </GridContainer>
      <CommonTableContainer sx={{ pb: '32px' }}>
        <AsyncListTable columns={columns} rowHocs={rowHocs} />
        <AsyncListTablePaging />
        <AsyncListItemActionsPopover actions={actions} />
        <DialogConfirmDelete />
      </CommonTableContainer>
    </AsyncListProvider>
  );
}
