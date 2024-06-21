import wait from '@/helpers/asyncHelpers/wait';
import { lazy, useCallback, useMemo } from 'react';
import type { DialogFormProps, FormValues } from '../../Detail';
import { MUTATE_ACTION } from '../../constants';
import { useAsyncListAction, useAsyncListInteract } from '../context';
import moment from 'moment';
const Form = lazy(() => wait().then(() => import('../../Detail').then((_) => ({ default: _.DialogForm }))));
const ACTION = MUTATE_ACTION.UPDATE;
export default function DialogDetail() {
  const { clearAction, reload, setAction } = useAsyncListAction();
  const { isActionWithInteract, interactItem } = useAsyncListInteract();
  const open = useMemo(() => {
    return isActionWithInteract?.(ACTION) === true;
  }, [isActionWithInteract]);
  const handleClose: Required<DialogFormProps>['onClose'] = useCallback(
    (callbackParams) => {
      const { reason, feedback } = callbackParams || {};
      switch (reason) {
        case 'after_success':
          if (!interactItem) {
            clearAction?.();
            setTimeout(() => {
              reload?.();
            }, 0);
            return;
          }
          if (feedback?.message === 'ok_then_creat_assigment' || feedback?.message === 'create_assigment') {
            setAction?.({
              item: interactItem,
              action: MUTATE_ACTION.CREATE_ASSIGNMENT,
            });
          }
          if (feedback?.message === 'request_sign') {
            setAction?.({
              item: interactItem,
              action: MUTATE_ACTION.REQUEST_SIGN,
            });
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
    [clearAction, reload, setAction, interactItem]
  );
  const values: Partial<FormValues> | undefined = useMemo(() => {
    if (!interactItem || !interactItem?.Id) return undefined;
    return {
      Attachments: [],
      Comment: undefined,
      DateIncomming: moment(),
      DateProcessDeadline: undefined,
      DatePublish: undefined,
      DateReceivedPaperCopy: undefined,
      DocumentAbstract: 'TRÍCH YẾU',
      DocumentBook: undefined,
      DocumentNotation: undefined,
      DocumentType: {
        CoTheThaoTac: null,
        Code: null,
        DocumentType: null,
        DonViId: null,
        Id: '68f40c94-b22d-434f-8aca-0e09219b7d0e',
        IsCapSoDi: null,
        IsDefault: null,
        LoaiVanBanMacDinhId: null,
        MacDinh: false,
        Name: 'so cong van den 2023',
        SuDung: null,
        TenVietTat: null,
        label: 'so cong van den 2023',
        value: '68f40c94-b22d-434f-8aca-0e09219b7d0e',
      },
      HaveReceivedPaperCopy: undefined,
      IsLegalDocument: undefined,
      IsRequestReply: undefined,
      NumberInIssueBook: 45,
      NumberSub: undefined,
      ReceivedType: {
        Code: 'BAN_GIAY',
        Id: 'f7a43398-b907-4330-b471-0889f23727aa',
        IsDefault: true,
        Name: 'Bản giấy',
        label: 'Bản giấy',
        value: 'f7a43398-b907-4330-b471-0889f23727aa',
      },
      SentFromType: undefined,
      Signer: undefined,
      TotalOfCopies: undefined,
      TotalOfDocumentPages: undefined,
      UrgencyDegree: undefined,
    };
  }, [interactItem]);
  return open ? (
    <Form
      open={open}
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
