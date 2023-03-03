import { styled } from '@mui/material';
import type { ToolbarProps } from '@mui/material/Toolbar';
import Toolbar from '@mui/material/Toolbar';

const ToolbarStyled = styled(Toolbar)<ToolbarProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));
export default ToolbarStyled;
