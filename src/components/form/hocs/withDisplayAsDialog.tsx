import { CommonDialog } from '@/components/dialogs';
import type { AnyObject, CommonDialogFormComponent, CommonDialogFormProps } from '@/types';
import type { DialogActionsProps } from '@mui/material/DialogActions';
import type { DialogTitleProps } from '@mui/material/DialogTitle';
import type { ComponentType } from 'react';
import { useMemo } from 'react';
import DialogContent from '@mui/material/DialogContent';
import type { DialogContentProps } from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
export default function withDisplayAsDialog(params?: {
  titleComponent?: ComponentType<DialogTitleProps<'div'>>;
  titleComponentProps?: Partial<DialogTitleProps<'div'>>;
  contentComponent?: ComponentType<DialogContentProps>;
  contentComponentProps?: Partial<DialogContentProps>;
  actionsComponent?: ComponentType<DialogActionsProps>;
  actionsComponentProps?: Partial<DialogActionsProps>;
}) {
  const {
    titleComponent,
    titleComponentProps,
    contentComponent,
    contentComponentProps,
    actionsComponent,
    actionsComponentProps,
  } = params || {};
  return function withDisplayAsDialogHoc<FormValues extends AnyObject = AnyObject>(
    WrappedComponent: CommonDialogFormComponent<FormValues>
  ): CommonDialogFormComponent<FormValues> {
    return function FormDialog(props) {
      const {
        loading: loadingProp,
        open: openProp,
        onSubmit,
        onClose,
        namePrefix,
        defaultValues,
        viewType,
        ...dialogProps
      } = props;
      const open = useMemo(() => !!openProp, [openProp]);
      const loading = useMemo(() => !!loadingProp, [loadingProp]);
      const formProps: Partial<CommonDialogFormProps<FormValues>> = useMemo(
        () => ({
          viewType,
          namePrefix,
          defaultValues,
          onSubmit,
          onClose,
          loading,
        }),
        [namePrefix, defaultValues, onSubmit, onClose, loading, viewType]
      );
      const $Title = useMemo(() => {
        if (!titleComponent) return null;
        const Title = titleComponent;
        return <Title {...titleComponentProps} />;
      }, []);
      const $Actions = useMemo(() => {
        if (!actionsComponent) return null;
        const Actions = actionsComponent;
        return <Actions {...actionsComponentProps} />;
      }, []);
      const $Content = useMemo(() => {
        let Content = DialogContent as ComponentType<DialogContentProps>;
        if (!!contentComponent) Content = contentComponent;
        return (
          <Content {...contentComponentProps}>
            <Grid container sx={{ width: '100%', height: '100%', alignContent: 'flex-start' }}>
              <WrappedComponent {...formProps} />
            </Grid>
          </Content>
        );
      }, [formProps]);
      return (
        <CommonDialog gridContent={false} open={open} loading={loading} {...dialogProps}>
          {$Title}
          {$Content}
          {$Actions}
        </CommonDialog>
      );
    };
  };
}
