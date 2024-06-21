import wait from '@/helpers/asyncHelpers/wait';
import type { DialogFormProps, FormValues } from '@/modules/DocumentProcessAssignment';
import { lazy, useCallback, useMemo } from 'react';
import { MUTATE_ACTION } from '../../constants';
import { useAsyncListAction, useAsyncListInteract } from '../context';
const Form = lazy(() =>
  wait().then(() => import('@/modules/DocumentProcessAssignment').then((m) => ({ default: m.DialogForm })))
);
const ACTION = MUTATE_ACTION.CREATE_ASSIGNMENT;
const ACTION_SIGN = MUTATE_ACTION.REQUEST_SIGN;
export default function DialogAssignment() {
  const { clearAction, reload } = useAsyncListAction();
  const { isActionWithInteract, interactItem } = useAsyncListInteract();
  const open = useMemo(() => {
    return isActionWithInteract?.(ACTION) === true || isActionWithInteract(ACTION_SIGN) === true;
  }, [isActionWithInteract]);
  // const isProcessAssignment = useMemo(() => isActionWithInteract?.(ACTION) === true, [isActionWithInteract]);
  const isSignAssignment = useMemo(
    () => isActionWithInteract?.(ACTION_SIGN) === true,
    [isActionWithInteract]
  );
  const handleClose: Required<DialogFormProps>['onClose'] = useCallback(
    (callbackParams) => {
      clearAction?.();
      switch (callbackParams?.reason) {
        case 'after_success':
          setTimeout(() => {
            reload?.();
          }, 0);
          break;
        case 'click_outside':
          break;
        case 'force_close':
          break;
        default:
          return;
      }
    },
    [clearAction, reload]
  );
  const values: Partial<FormValues> | undefined = useMemo(() => {
    if (!interactItem || !interactItem?.Id) return undefined;
    return {
      AssigmentType: isSignAssignment ? 'sign' : 'process',
      DocumentType: 'outgoing',
      DocumentId: `${interactItem.Id}`,
      Assignees: [],
      AssigmentNote: '',
      IsSendViaEmail: false,
      IsRequiredReply: false,
      ProcessId: 'cad8f954-c412-4965-8e94-7f6647d7a9cb', // `${interactItem.Id}`,
      TaskId: 'ff9de975-9b6f-480f-9a44-0a44b1925863', // interactItem?.TaskId || '',
    };
  }, [interactItem, isSignAssignment]);
  return open ? (
    <Form
      open
      maxWidth={false}
      sx={{
        '& .MuiDialog-container > .MuiPaper-root': {
          width: '100vw',
          height: '100vh',
        },
      }}
      values={values}
      viewType="editable"
      onClose={handleClose}
    />
  ) : (
    <></>
  );
}
