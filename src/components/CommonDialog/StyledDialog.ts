import { styled } from '@mui/material';
import type { DialogProps } from '@mui/material/Dialog';
import Dialog from '@mui/material/Dialog';

const StyledDialog = styled(Dialog)<DialogProps>(({ theme }) => ({
  '& > .MuiDialog-container': {
    '> .MuiPaper-root': {
      position: 'relative',
    },
  },
}));
export default StyledDialog;