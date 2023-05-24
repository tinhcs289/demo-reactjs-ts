import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material';
const CommonTableContainer = styled(Box)<BoxProps>({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
});
export default CommonTableContainer;
