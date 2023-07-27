import { GridContainer } from '@/components/grid';
import { CommonTableColumnVisibility, CommonTableContainer } from '@/components/table';
import Grid from '@mui/material/Grid';
import { actions, columns, rowHocs } from '../constants';
import {
  AsyncListItemActionsPopover,
  AsyncListProvider,
  AsyncListTablePaging,
  AsyncListPaging,
  AsyncListTableWithColumnVisibility,
} from '../context';
import { getList } from '../services';
import ChangeColumnVisibility from './ChangeColumnVisibility';
import DialogConfirmDelete from './DialogConfirmDelete';
import FormFilter from './FormFilter';
import QueryStringInitializer from './QueryStringInitializer';
import ListActions from './ListActions';
export default function TableList() {
  return (
    <AsyncListProvider onQuery={getList} queryOnFirstLoad idField="Id" defaultSelectable>
      <QueryStringInitializer />
      <CommonTableColumnVisibility columns={columns}>
        <GridContainer>
          <ListActions item xs={12} />
          <Grid item container alignItems="center">
            <FormFilter />
            <AsyncListTablePaging />
            <ChangeColumnVisibility />
          </Grid>
        </GridContainer>
        <CommonTableContainer
          sx={{
            maxHeight: `calc(100vh - ${258}px)`,
          }}
        >
          <AsyncListTableWithColumnVisibility columns={columns} rowHocs={rowHocs} />
          <AsyncListItemActionsPopover actions={actions} />
          <DialogConfirmDelete />
        </CommonTableContainer>
        <GridContainer justifyContent="flex-end" alignItems="center">
          <Grid item xs={12}>
            <AsyncListPaging
              shape="rounded"
              size="small"
              hideNextButton
              hidePrevButton
              showFirstButton={false}
              showLastButton={false}
            />
          </Grid>
        </GridContainer>
      </CommonTableColumnVisibility>
    </AsyncListProvider>
  );
}
