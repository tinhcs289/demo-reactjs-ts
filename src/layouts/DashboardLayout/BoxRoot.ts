import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
const BoxRoot = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  overflowY: 'hidden',
}));
export default BoxRoot;
