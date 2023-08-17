import { styled } from '@mui/material';
import type { AppBarProps } from '@mui/material/AppBar';
import AppBar from '@mui/material/AppBar';
const TopBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
}));
export default TopBar;
