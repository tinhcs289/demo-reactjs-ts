import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
const FallbackProductList = styled(Box)<BoxProps>(({ theme }) => ({
  height: theme.spacing(100),
  background: theme.palette.action.hover,
}));
export default FallbackProductList;
