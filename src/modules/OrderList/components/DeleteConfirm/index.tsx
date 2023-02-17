import CommonDialog from '@/components/CommonDialog';
import { ACTION } from '@/hooks/useAsyncListState/constants';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAsyncList } from '../../context';
import deleteItem from '../../services/deleteItem';

const DeleteConfirm: FC<any> = (props) => {
  const { t } = useTranslation();
  const [clear] = useAsyncList((s) => s?.action?.clear);
  const [reload] = useAsyncList((s) => s?.control?.reload);
  const [interactItem] = useAsyncList((s) => s?.interactItem);
  const [isItemInteractAction] = useAsyncList((s) => s?.action?.isItemInteractAction);
  const [loading, setLoading] = useState<boolean>(false);
  const { showSuccessNotify, showErrorNotify } = useSnackbarNotify();

  const open = useMemo(() => {
    return isItemInteractAction?.(ACTION.DELETE) || false;
  }, [isItemInteractAction]);

  const handleClose = useCallback(() => {
    clear?.();
  }, [clear]);

  const handleSubmit = useCallback(async () => {
    if (!interactItem?.id) return;
    setLoading(true);
    const [result, error] = await deleteItem({ id: interactItem.id });
    if (error) {
      showErrorNotify(t('common:somethingWentWrong_pleaseTryAgainLater'), {
        anchorOrigin: { horizontal: 'center', vertical: 'top' },
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    showSuccessNotify(result?.message || `${t('common:deleted')} ${interactItem.bookingCode}`, {
      anchorOrigin: { horizontal: 'center', vertical: 'top' },
    });
    clear?.();
    reload?.();
    return;
  }, [t, interactItem, clear, reload, showErrorNotify, showSuccessNotify]);

  const memoActions = useMemo(() => {
    return (
      <>
        <Button onClick={handleClose as any}>{t('common:cancel')}</Button>
        <Button onClick={handleSubmit as any} startIcon={<CheckIcon />} color="primary" variant="contained">
          {t('common:confirm')}
        </Button>
      </>
    );
  }, [t, handleClose, handleSubmit]);

  const content = useMemo(() => {
    if (!interactItem) return null;

    return (
      <Typography>
        {t('booking:table.areYouSureToDelete')}&nbsp;<b>{interactItem.bookingCode}</b>
        &nbsp;{interactItem.name}
        {`?`}
      </Typography>
    );
  }, [t, interactItem]);

  return (
    <CommonDialog
      open={open}
      loading={loading}
      onClose={handleClose as any}
      title={t<string>('common:pleaseConfirmForPerformThisAction')}
      actions={memoActions}
    >
      {content}
    </CommonDialog>
  );
};
export default DeleteConfirm;
