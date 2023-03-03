import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';

const BoxContent = styled(Box)<BoxProps>(({ theme }) => ({
  margin: 0,
  padding: 0,
  height: '100%',
  overflow: 'auto',
  position: 'relative',
}));
export default BoxContent;
