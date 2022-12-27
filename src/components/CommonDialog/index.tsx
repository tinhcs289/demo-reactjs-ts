import { styled } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import type { FC } from 'react';
import { useMemo } from 'react';
import { slideDict } from './constants';
import { TCommonDialogProps } from './_types';

const DialogComponent: FC<TCommonDialogProps> = (props) => {
  const {
    slide,
    title,
    titleProps,
    children,
    actions,
    actionsProps,
    gridContent = true,
    contentProps,
    loading,
    backdropProps,
    loadingInner,
    ...otherProps
  } = props;

  const memoTitle = useMemo(() => {
    if (!title) return null;
    return <DialogTitle {...titleProps}>{title}</DialogTitle>;
  }, [title, titleProps]);

  const memoAction = useMemo(() => {
    if (!actions) return null;

    return <DialogActions {...actionsProps}>{actions}</DialogActions>;
  }, [actions, actionsProps]);

  const memoContent = useMemo(() => {
    if (!!gridContent) {
      if (gridContent === true)
        return (
          <DialogContent {...contentProps}>
            <Grid container>{children}</Grid>
          </DialogContent>
        );

      <DialogContent {...contentProps}>
        <Grid container {...gridContent}>
          {children}
        </Grid>
      </DialogContent>;
    }
    return children;
  }, [gridContent, contentProps, children]);

  const memoLoading = useMemo(() => {
    if (!loading) return null;

    const { sx: _sx, ..._props } = backdropProps || {};

    return (
      <Backdrop {..._props} open sx={{ ..._sx, zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }}>
        {loadingInner || <CircularProgress color="inherit" />}
      </Backdrop>
    );
  }, [loading, backdropProps, loadingInner]);

  return (
    <Dialog TransitionComponent={slideDict[slide || 'down']} {...otherProps}>
      {memoLoading}
      {memoTitle}
      {memoContent}
      {memoAction}
    </Dialog>
  );
};
const CommonDialog = styled(DialogComponent)<TCommonDialogProps>(
  () =>
    ({
      '& > .MuiDialog-container': {
        '> .MuiPaper-root': {
          position: 'relative',
        },
      },
    } as any),
) as FC<TCommonDialogProps>;
export default CommonDialog;
