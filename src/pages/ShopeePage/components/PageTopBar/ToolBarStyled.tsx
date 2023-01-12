import { styled } from '@mui/material';
import type { ToolbarProps } from '@mui/material/Toolbar';
import Toolbar from '@mui/material/Toolbar';

const ToolBarStyled = styled(Toolbar)<ToolbarProps>(({ theme }) => ({
  margin: '0 auto',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    width: theme.breakpoints.values.md,
  },
  [theme.breakpoints.up('lg')]: {
    width: theme.breakpoints.values.lg,
  },
}));
export default ToolBarStyled;
