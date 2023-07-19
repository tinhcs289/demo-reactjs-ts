import { ButtonNegative, ButtonPositive } from '@/components/buttons';
import { useRHFSubmitDispatch } from '@/components/form';
import { GridItem, GridItemDivider } from '@/components/grid';
import ScrollableContainer from '@/containers/ScrollableContainer';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import CloseIcon from '@mui/icons-material/Close';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Grid from '@mui/material/Grid';
import type { MouseEventHandler } from 'react';
import { useCallback } from 'react';
import type { FormComponent, FormProps } from '../_types';
function FormActionGroup(props: { onClose?: FormProps['onClose'] }) {
  const { onClose } = props;
  const { dispatchSubmit } = useRHFSubmitDispatch();
  const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      onClose?.({ reason: 'force_close' });
    },
    [onClose]
  );
  const handleAction =
    (action: string): MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      event?.stopPropagation?.();
      dispatchSubmit?.(action);
    };
  return (
    <GridItem xs={12} sx={{ px: 0.5 }} justifyContent="space-between">
      <Grid item xs={10} md={11} container>
        <ScrollableContainer height="40px" togglable>
          <GridItem disabledXs sx={{ py: '7px', px: 0.5 }}>
            <ButtonPositive startIcon={<NoteAddIcon />} onClick={handleAction('create')}>
              {`Tạo mới`}
            </ButtonPositive>
          </GridItem>
          <GridItem disabledXs sx={{ py: '7px', px: 0.5 }}>
            <ButtonPositive startIcon={<FileCopyIcon />} color="info" onClick={handleAction('save_draft')}>
              {`Lưu nháp`}
            </ButtonPositive>
          </GridItem>
          <GridItem disabledXs sx={{ py: '7px', px: 0.5 }}>
            <ButtonPositive
              startIcon={<NoteAddIcon />}
              endIcon={<AssignmentReturnIcon sx={{ transform: `rotateY(-180deg)` }} />}
              color="success"
              onClick={handleAction('save_then_assign')}
            >
              {`Tạo và phân xử lý`}
            </ButtonPositive>
          </GridItem>
          <GridItem disabledXs sx={{ py: '7px', px: 0.5 }}>
            <ButtonPositive
              size="small"
              startIcon={<NoteAddIcon />}
              endIcon={<ExitToAppIcon />}
              onClick={handleAction('save_then_close')}
            >
              {`Tạo và đóng`}
            </ButtonPositive>
          </GridItem>
        </ScrollableContainer>
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
        <FormActionGroup />
      </>
    );
  };
}
