import { GridContainer } from '@/components/grid';
import { CommonTableColumnVisibility, CommonTableContainer } from '@/components/table';
import Grid from '@mui/material/Grid';
import FormFilter from '../components-imported/FormFilter';
import { actions, columns, rowHocs } from '../constants';
import {
  AsyncListItemActionsPopover,
  AsyncListPaging,
  AsyncListProvider,
  AsyncListTablePaging,
  AsyncListTableWithColumnVisibility,
} from '../context';
import { getList } from '../services';
import ChangeColumnVisibility from './ChangeColumnVisibility';
import DialogConfirmDelete from './DialogConfirmDelete';
import ListActions from './ListActions';
import QueryStringAndRouterParametersInitializer from './QueryStringAndRouterParametersInitializer';
const maxHeight = `calc(100vh - ${258}px)`;
export default function TableList() {
  return (
    <AsyncListProvider onQuery={getList} idField="Id" defaultSelectable>
      <QueryStringAndRouterParametersInitializer />
      <CommonTableColumnVisibility columns={columns}>
        <GridContainer>
          <ListActions item xs={12} />
          <Grid item container alignItems="center">
            <FormFilter />
            <AsyncListTablePaging />
            <ChangeColumnVisibility />
          </Grid>
        </GridContainer>
        <CommonTableContainer sx={{ maxHeight }}>
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
