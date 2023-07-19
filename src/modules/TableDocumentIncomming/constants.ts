import { BodyRowHoc, menuActions, tableConfig } from '@/components/table';
import { DOCUMENT_STATUS } from '@/constants/document';
import type { RowData } from './_types';
import CellAction from './components/CellAction';
import CellStatus from './components/CellStatus';
import MenuActionDelete from './components/MenuActionDelete';
import MenuActionOpenDetail from './components/MenuActionOpenDetail';
import withRowClickHandler from './hocs/withRowClickHandler';
export const STATUS = DOCUMENT_STATUS;
export const actions = menuActions<RowData>([{ render: MenuActionOpenDetail }, { render: MenuActionDelete }]);
export const columns = tableConfig<RowData>(
  {
    field: '_action',
    headCell: 'Thao tác',
    headCellProps: { align: 'center', sx: { width: '0%' } },
    bodyCellInner: CellAction,
    bodyCellProps: { align: 'center', sx: { p: '4px' } },
    stickyFirst: true,
  },
  {
    field: 'SoDen',
    headCell: 'Số đến',
    stickyFirst: true,
  },
  {
    field: 'MaTrangThai',
    headCell: 'Trạng thái',
    bodyCellInner: CellStatus,
    stickyFirst: true,
  },
  {
    field: 'NgayDen',
    headCell: 'Ngày đến',
  },
  {
    field: 'NoiGui',
    headCell: 'Nơi gửi',
  },
  {
    field: 'SoKyHieu',
    headCell: 'Số/Ký hiệu',
  },
  {
    field: 'NgayBanHanh',
    headCell: 'Ngày ban hành',
  },
  {
    field: 'TrichYeu',
    headCell: 'Trích yếu',
  },
  {
    field: 'ChuTri',
    headCell: 'Chủ trì',
  },
  {
    field: 'PhoiHop',
    headCell: 'Phối hợp',
  }
);
export const rowHocs: BodyRowHoc<RowData>[] = [withRowClickHandler];
