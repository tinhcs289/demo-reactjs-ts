import type { TableContainerProps } from '@mui/material/TableContainer';
export default function buildContainerProps(
  props?: Partial<TableContainerProps>
): Partial<TableContainerProps> {
  const { sx, ...otherProps } = props || {};
  return {
    ...otherProps,
    sx: {
      maxHeight: '100%',
      flex: 1,
      ...sx,
      position: 'relative',
    },
  };
}