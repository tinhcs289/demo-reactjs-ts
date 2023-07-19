import { styled } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import type { TableContainerProps } from '@mui/material/TableContainer';
const TableContainerStyled = styled(TableContainer)<TableContainerProps>({
  display: 'flex',
  flexDirection: 'column',
});
export default TableContainerStyled;
