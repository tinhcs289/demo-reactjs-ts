import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
const FallbackContentBlock = styled(Box)<BoxProps>(({ theme }) => ({
  height: theme.spacing(20),
  background: theme.palette.action.hover,
}));
export default FallbackContentBlock;
