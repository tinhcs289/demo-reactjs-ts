//@ts-nocheck --entire-file
import { BodyRowHoc, menuActions, tableConfig } from '@/components/table';
import { i18n } from '@/translation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { RowData } from './_types';
import CellAction from './components/CellAction';
import CellCode from './components/CellCode';
import CellToggleDetailPanel from './components/CellToggleDetailPanel';
import MenuActionDelete from './components/MenuActionDelete';
import MenuActionOpenDetail from './components/MenuActionOpenDetail';
import withRowClickHandler from './hocs/withRowClickHandler';
export const actions = menuActions<RowData>([
  { render: MenuActionOpenDetail },
  { render: MenuActionDelete },
  { type: 'divider' },
  { label: 'Navigate to somewhere', icon: ArrowForwardIcon, to: '#' },
]);
export const columns = tableConfig<RowData>(
  {
    field: 'id',
    headCell: ' ',
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: CellToggleDetailPanel,
    bodyCellProps: { align: 'center', sx: { p: '4px' } },
    stickyFirst: true,
  },
  {
    field: 'bookingCode',
    headCell: i18n.t('booking:table.bookingCode'),
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: CellCode,
    bodyCellProps: { sx: { padding: '4px' } },
    stickyFirst: true,
  },
  {
    field: 'name',
    headCell: i18n.t('booking:table.name'),
    bodyCellProps: { sx: { py: '4px', px: '8px' } },
    stickyFirst: true,
  },
  {
    field: 'action',
    headCell: i18n.t('booking:table.action'),
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: CellAction,
    bodyCellProps: { align: 'center', sx: { p: '4px' } },
    stickyLast: true,
  }
);
export const rowHocs: BodyRowHoc<RowData>[] = [withRowClickHandler];
