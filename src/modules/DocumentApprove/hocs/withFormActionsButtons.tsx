import BoxHorizontalSrcoll from '@/components/box/BoxHorizontalSrcoll';
import { ButtonNegative } from '@/components/buttons';
import { GridItem, GridItemDivider } from '@/components/grid';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import type { MouseEventHandler } from 'react';
import { useCallback } from 'react';
import type { FormComponent, FormProps } from '../_types';
import ActionButtons from '../components/ActionButtons';
function FormActionGroup(props: { onClose?: FormProps['onClose'] }) {
  const { onClose } = props;
  const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      onClose?.({ reason: 'force_close' });
    },
    [onClose]
  );
  return (
    <GridItem xs={12} sx={{ px: 0.5 }} justifyContent="space-between">
      <Grid item xs={10} md={11} container>
        <BoxHorizontalSrcoll height="40px" togglable>
          <ActionButtons />
        </BoxHorizontalSrcoll>
      </Grid>
      <Grid item xs={2} md={1} container justifyContent="flex-end">
        <Grid item sx={{ py: 1, px: 0.5 }}>
          <ButtonNegative startIcon={<CloseIcon />} onClick={handleClose}>
            {`Đóng`}
          </ButtonNegative>
        </Grid>
      </Grid>
    </GridItem>
  );
}
export default function withFormActionsButtons(WrappedComponent: FormComponent): FormComponent {
  return function FormWithActionsButtons(props: FormProps) {
    return (
      <>
        <FormActionGroup onClose={props?.onClose} />
        <GridItemDivider sx={{ mb: 2 }} />
        <WrappedComponent {...props} />
        <GridItemDivider />
        <FormActionGroup onClose={props?.onClose} />
      </>
    );
  };
}
