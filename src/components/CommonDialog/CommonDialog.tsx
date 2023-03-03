import type { Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import type { ComponentType } from 'react';
import { useMemo } from 'react';
import { slideDict } from './constants';
import LoadingBackdrop from './LoadingBackdrop';
import StyledDialog from './StyledDialog';
import type { TCommonDialogProps } from './_types';

const CommonDialog: ComponentType<TCommonDialogProps> = (props) => {
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

      return (
        <DialogContent {...contentProps}>
          <Grid container {...gridContent}>
            {children}
          </Grid>
        </DialogContent>
      );
    }
    return children;
  }, [gridContent, contentProps, children]);

  const memoLoading = useMemo(() => {
    if (!loading) return null;

    const { sx: _sx, ..._props } = backdropProps || {};

    return (
      <LoadingBackdrop {..._props} open>
        {loadingInner || <CircularProgress color="inherit" />}
      </LoadingBackdrop>
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
      {memoLoading}
      {memoTitle}
      {memoContent}
      {memoAction}
    </StyledDialog>
  );
};
export default CommonDialog;
