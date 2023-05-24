import { APP_BAR_HEIGHT } from '@/layouts/DashboardLayout/constants';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
const BoxContent = styled(Box)<BoxProps>(() => ({
  margin: 0,
  padding: 0,
  height: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
  overflow: 'auto',
  position: 'relative',
}));
export default BoxContent;
