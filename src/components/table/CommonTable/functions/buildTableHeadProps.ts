import type { TableHeadProps } from '@mui/material/TableHead';
import { cellEndDividerSx } from '../constants';
export default function buildTableHeadProps(props?: Partial<TableHeadProps>): Partial<TableHeadProps> {
  const { sx, ...otherProps } = props || {};
  return {
    ...otherProps,
    sx: {
      whiteSpace: 'nowrap',
      ...cellEndDividerSx,
      ...sx,
      position: 'relative',
    } as any,
  };
}