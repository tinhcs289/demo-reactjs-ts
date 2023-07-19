import type { TableProps } from '@mui/material/Table';
export default function buildTableProps(props?: Partial<TableProps>): Partial<TableProps> {
  const { sx, ...otherProps } = props || {};
  return { ...otherProps, sx: { width: '100%', ...sx } };
}
