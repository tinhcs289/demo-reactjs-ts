import { CommonDialogActions } from '@/components/dialogs';
import type { DialogActionsProps } from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import ActionButtons from './ActionButtons';
export default function DialogFormActions(props: DialogActionsProps) {
  return (
    <CommonDialogActions {...props}>
      <Grid container sx={{ px: 0.5, width: '100%' }}>
        <ActionButtons />
      </Grid>
    </CommonDialogActions>
  );
}
