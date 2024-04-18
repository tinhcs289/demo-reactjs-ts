import type { DialogActionsProps, Theme } from '@mui/material';
import { DialogTitleProps, styled, useMediaQuery } from '@mui/material';
import type { BackdropProps } from '@mui/material/Backdrop';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import type { DialogProps } from '@mui/material/Dialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { useMemo } from 'react';
import type { CommonDialogContentProps, CommonDialogProps } from './_types';
import { slideDict } from './constants';
export function CommonDialogTitle(props: DialogTitleProps<'div'>) {
  const { children, ...otherProps } = props;
  return (
    <DialogTitle
      component="div"
      mb={2}
      {...(otherProps as any)}
      sx={{
        borderRadius: 0,
        padding: `12px 24px`,
        boxShadow: (t) => t?.shadows?.[4],
        ...otherProps?.sx,
      }}
    >
      {children}
    </DialogTitle>
  );
}
export function CommonDialogActions(props: DialogActionsProps) {
  const { children, ...otherProps } = props;
  return (
    <DialogActions
      mt={2}
      {...(otherProps as any)}
      sx={{
        borderRadius: 0,
        boxShadow: (t) => t?.shadows?.[4],
        ...otherProps?.sx,
      }}
    >
      {children}
    </DialogActions>
  );
}
const LoadingBackdrop = styled(Backdrop)<BackdropProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  position: 'absolute',
}));
const StyledDialog = styled(Dialog, {
  shouldForwardProp: (p) => p !== 'fullWidth',
})<DialogProps>(({ fullWidth }) => ({
  ...(!!fullWidth ? { maxWidth: 'calc(100% - 64px) !important' } : {}),
  '& > .MuiDialog-container': {
    '> .MuiPaper-root': {
      position: 'relative',
    },
  },
}));
export function CommonDialogContent(props: CommonDialogContentProps) {
  const { children, gridProps, ...otherProps } = props;
  return (
    <DialogContent {...otherProps}>
      <Grid container {...gridProps}>
        {children}
      </Grid>
    </DialogContent>
  );
}
export function CommonDialogLoadingBackdrop(props: BackdropProps) {
  const { children, ...otherProps } = props;
  return (
    <LoadingBackdrop {...otherProps}>{children || <CircularProgress color="inherit" />}</LoadingBackdrop>
  );
}
export function CommonDialog(props: CommonDialogProps) {
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
    fullScreen: fullScreenProp,
    ...otherProps
  } = props;
  const $Title = useMemo(() => {
    if (!title) return null;
    return <CommonDialogTitle {...titleProps}>{title}</CommonDialogTitle>;
  }, [title, titleProps]);
  const $Actions = useMemo(() => {
    if (!actions) return null;
    return <CommonDialogActions {...actionsProps}>{actions}</CommonDialogActions>;
  }, [actions, actionsProps]);
  const $Content = useMemo(() => {
    if (!gridContent) return children;
    if (gridContent === true) return <CommonDialogContent {...contentProps}>{children}</CommonDialogContent>;
    return (
      <CommonDialogContent {...contentProps} gridProps={gridContent}>
        {children}
      </CommonDialogContent>
    );
  }, [gridContent, contentProps, children]);
  const $Loading = useMemo(() => {
    if (!loading) return null;
    const { sx: _sx, ..._props } = backdropProps || {};
    if (!loadingInner) return <CommonDialogLoadingBackdrop {..._props} open />;
    return (
      <CommonDialogLoadingBackdrop {..._props} open>
        {loadingInner}
      </CommonDialogLoadingBackdrop>
    );
  }, [loading, backdropProps, loadingInner]);
  const isSmallScreenOrSmaller = useMediaQuery((t: Theme) => t?.breakpoints?.down?.('sm'));
  const fullScreen = useMemo(() => {
    if (fullScreenProp) return true;
    if (isSmallScreenOrSmaller) return true;
    return false;
  }, [fullScreenProp, isSmallScreenOrSmaller]);
  return (
    <StyledDialog TransitionComponent={slideDict[slide || 'down']} fullScreen={fullScreen} {...otherProps}>
      {$Loading}
      {$Title}
      {$Content}
      {$Actions}
    </StyledDialog>
  );
}
