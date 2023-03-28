import FormCloseButton from '@/components/buttons/FormCloseButton';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import CommonDialog from '@/components/CommonDialog';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import Typography from '@mui/material/Typography';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAsyncListAction, useAsyncListInteract } from '../../context';
import deleteItem from '../../services/deleteItem';
const notifyAnchor = { horizontal: 'center', vertical: 'top' };
export default function DeleteConfirm() {
  const { t } = useTranslation();
  const { clearAction: clear, reload } = useAsyncListAction();
  const { interactItem, isActionWithInteract } = useAsyncListInteract();
  const [loading, setLoading] = useState<boolean>(false);
  const { showSuccessNotify, showErrorNotify } = useSnackbarNotify();
  const open = useMemo(() => {
    return isActionWithInteract?.('DELETE') === true;
  }, [isActionWithInteract]);
  const handleClose = useCallback(() => {
    clear?.();
  }, [clear]);
  const handleSubmit = useCallback(async () => {
    if (!interactItem?.id) return;
    setLoading(true);
    const [result, error] = await deleteItem({ id: interactItem.id });
    setLoading(false);
    if (error) {
      showErrorNotify(t('common:somethingWentWrong_pleaseTryAgainLater'), {
        anchorOrigin: notifyAnchor as any,
      });
      return;
    }
    showSuccessNotify(result?.message || `${t('common:deleted')} ${interactItem.bookingCode}`, {
      anchorOrigin: notifyAnchor as any,
    });
    clear?.();
    reload?.();
    return;
  }, [t, interactItem, clear, reload, showErrorNotify, showSuccessNotify]);
  const $Actions = useMemo(
    () => (
      <>
        <FormCloseButton onClick={handleClose}>{t('common:cancel')}</FormCloseButton>
        <FormSubmitButton onClick={handleSubmit}>{t('common:confirm')}</FormSubmitButton>
      </>
    ),
    [t, handleClose, handleSubmit]
  );
  const $Content = useMemo(
    () =>
      !interactItem ? null : (
        <Typography>
          {t('booking:table.areYouSureToDelete')}&nbsp;<b>{interactItem.bookingCode}</b>
          &nbsp;{interactItem.name}
          {`?`}
        </Typography>
      ),
    [t, interactItem]
  );
  const $Return = useMemo(
    () => (
      <CommonDialog
        open={open}
        loading={loading}
        onClose={handleClose as any}
        title={t<string>('common:pleaseConfirmForPerformThisAction')}
        actions={$Actions}
      >
        {$Content}
      </CommonDialog>
    ),
    [open, loading, handleClose, t, $Actions, $Content]
  );
  return $Return;
}
