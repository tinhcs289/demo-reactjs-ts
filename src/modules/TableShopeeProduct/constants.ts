import { BodyRowHoc, menuActions, tableConfig } from '@/components/table';
import { i18n } from '@/translation';
import type { RowData } from './_types';
import CellAction from './components/CellAction';
import CellId from './components/CellId';
import CellPrice from './components/CellPrice';
import CellToggleDetailPanel from './components/CellToggleDetailPanel';
import MenuActionDelete from './components/MenuActionDelete';
import MenuActionOpenDetail from './components/MenuActionOpenDetail';
import withRowClickHandler from './hocs/withRowClickHandler';
export const ID_FIELD = 'itemid';
export const actions = menuActions<RowData>([{ render: MenuActionOpenDetail }, { render: MenuActionDelete }]);
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
    field: ID_FIELD,
    headCell: 'Mã',
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: CellId,
    bodyCellProps: { sx: { padding: '4px' } },
    stickyFirst: true,
  },
  {
    field: 'name',
    headCell: 'Sản phẩm',
    bodyCellProps: { sx: { py: '4px', px: '8px' } },
  },
  {
    field: 'price',
    headCell: 'Đơn giá',
    headCellProps: { align: 'right' },
    bodyCellInner: CellPrice,
    bodyCellProps: {
      align: 'right',
      sx: {
        p: '8px',
        color: (t) => t?.palette?.primary?.dark,
        fontWeight: (t) => t?.typography?.fontWeightBold,
      },
    },
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
