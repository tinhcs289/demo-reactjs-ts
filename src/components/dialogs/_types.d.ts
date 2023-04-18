import type { BackdropProps } from '@mui/material/Backdrop';
import type { DialogProps } from '@mui/material/Dialog';
import type { DialogActionsProps } from '@mui/material/DialogActions';
import type { DialogContentProps } from '@mui/material/DialogContent';
import type { DialogTitleProps } from '@mui/material/DialogTitle';
import type { GridProps } from '@mui/material/Grid';
import type { ReactNode } from 'react';
import { CommonDialogSlide } from './constants';
export type CommonDialogSlideProps = `${CommonDialogSlide}`;
export type CommonDialogProps = DialogProps & {
  slide?: CommonDialogSlideProps;
  title?: ReactNode;
  titleProps?: Omit<DialogTitleProps, 'children'>;
  actions?: ReactNode;
  actionsProps?: Omit<DialogActionsProps, 'children'>;
  gridContent?: true | Omit<GridProps, 'container' | 'children'>;
  contentProps?: Omit<DialogContentProps, 'children'>;
  backdropProps?: Omit<BackdropProps, 'open' | 'children'>;
  loading?: boolean;
  loadingInner?: ReactNode;
};
export type CommonDialogContentProps = DialogContentProps & {
  gridProps?: GridProps;
};