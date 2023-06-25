import { ButtonNegative, ButtonSubmit } from '@/components/buttons';
import { CommonDialog } from '@/components/dialogs';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import Typography from '@mui/material/Typography';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAsyncListAction, useAsyncListInteract } from '../context';
import { deleteItem } from '../services';
const notifyAnchor = { horizontal: 'center', vertical: 'top' };
export default function DialogConfirmDelete() {
  const { t } = useTranslation();
  const { clearAction, reload } = useAsyncListAction();
  const { interactItem, isActionWithInteract } = useAsyncListInteract();
  const [loading, setLoading] = useState<boolean>(false);
  const { showSuccessNotify, showErrorNotify } = useSnackbarNotify();
  const open = useMemo(() => {
    return isActionWithInteract?.('DELETE') === true;
  }, [isActionWithInteract]);
  const handleClose = useCallback(() => {
    clearAction?.();
  }, [clearAction]);
  const clearActionThenReload = useCallback(() => {
    clearAction?.();
    reload?.();
  }, [clearAction, reload]);
  const handleSubmit = useCallback(
    async function submit() {
      if (!interactItem?.id) return;
      setLoading(true);
      const [error, result] = await deleteItem({ id: interactItem.id });
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
      clearActionThenReload();
    },
    [t, interactItem, clearActionThenReload, showErrorNotify, showSuccessNotify]
  );
  return (
    <CommonDialog
      open={open}
      loading={loading}
      onClose={handleClose as any}
      title={t<string>('common:pleaseConfirmForPerformThisAction')}
      actions={
        <>
          <ButtonNegative onClick={handleClose}>{t('common:cancel')}</ButtonNegative>
          <ButtonSubmit onClick={handleSubmit}>{t('common:confirm')}</ButtonSubmit>
        </>
      }
    >
      {!interactItem ? null : (
        <Typography>
          {t('booking:table.areYouSureToDelete')}&nbsp;<b>{interactItem.bookingCode}</b>
          &nbsp;{interactItem.name}
          {`?`}
        </Typography>
      )}
    </CommonDialog>
  );
}
