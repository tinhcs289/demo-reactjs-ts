import wait from '@/helpers/asyncHelpers/wait';
import { useAsyncListAction, useAsyncListGetter, useAsyncListInteract } from '../context';
import { lazy, useCallback, useMemo } from 'react';
import { MUTATE_ACTION } from '../../constants';
import type { DialogFormProps } from '../../Detail';
const Form = lazy(() => wait().then(() => import('../../Detail').then((_) => ({ default: _.DialogForm }))));
const ACTION = MUTATE_ACTION.CREATE;
export default function DialogCreate() {
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
          if (callbackParams?.feedback?.message === 'ok_then_creat_assigment') {
            setAction?.({
              item: dataInPage?.[0],
              action: MUTATE_ACTION.CREATE_ASSIGNMENT,
            });
          } else if (callbackParams?.feedback?.message === 'ok_then_creat_sign_request') {
            setAction?.({
              item: dataInPage?.[0],
              action: MUTATE_ACTION.CREATE_REQUEST_SIGNATURE,
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
  return open ? <Form open={open} maxWidth={false} viewType="creation" onClose={handleClose} /> : <></>;
}
