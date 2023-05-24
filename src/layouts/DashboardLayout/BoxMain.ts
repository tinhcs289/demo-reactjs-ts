import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
const BoxMain = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
  flexGrow: 1,
  height: '100vh',
  width: '100%',
  position: 'relative',
  overflowX: 'auto',
  overflowY: 'hidden',
}));
export default BoxMain;
