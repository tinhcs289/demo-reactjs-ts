import wait from '@/helpers/asyncHelpers/wait';
import type { DialogFormProps } from '@/modules/DocumentApprove';
import { lazy, useCallback, useMemo } from 'react';
import { MUTATE_ACTION } from '../../constants';
import { useAsyncListAction, useAsyncListGetter, useAsyncListInteract } from '../context';
const Form = lazy(() =>
  wait().then(() => import('@/modules/DocumentApprove').then((_) => ({ default: _.DialogForm })))
);
const ACTION = MUTATE_ACTION.APPROVE;
export default function DialogApprove() {
  const dataInPage = useAsyncListGetter((s) => s?.dataInPage);
  const { clearAction, reload, setAction } = useAsyncListAction();
  const { isAction } = useAsyncListInteract();
  const open = useMemo(() => {
    return isAction?.(ACTION) === true;
  }, [isAction]);
  const handleClose: Required<DialogFormProps>['onClose'] = useCallback(
    (callbackParams) => {
      switch (callbackParams?.reason) {
        case 'after_success':
          //message: 'ok_then_creat_assigment'
          if (callbackParams?.feedback?.message === 'ok_then_creat_assigment') {
            setAction?.({
              item: dataInPage?.[0],
              action: MUTATE_ACTION.CREATE_ASSIGNMENT,
            });
          } else {
            clearAction?.();
            setTimeout(() => {
              reload?.();
            }, 0);
          }
          break;
        case 'click_outside':
          clearAction?.();
          break;
        case 'force_close':
          clearAction?.();
          break;
        default:
          return;
      }
    },
    [clearAction, reload, setAction, dataInPage]
  );
  return open ? (
    <Form
      open={open}
      maxWidth={false}
      sx={{
        '& .MuiDialog-container > .MuiPaper-root': {
          width: '60vw',
        },
      }}
      viewType="editable"
      onClose={handleClose}
    />
  ) : (
    <></>
  );
}
