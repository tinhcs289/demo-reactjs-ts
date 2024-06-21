import { GridContainerProps } from '@/components/grid';
import ListActionButtonContainer, { ListActionButtonItem } from '@/containers/ListActionButtonContainer';
import { ComponentType, useMemo } from 'react';
import { DOCUMENT_STATUS } from '../../constants';
import { useAsyncListGetter } from '../context';
import ButtonCreateNumberThenHold from './ButtonCreateNumberThenHold';
import ButtonCreateNumberThenPublish from './ButtonCreateNumberThenPublish';
import ButtonExportExcel from './ButtonExportExcel';
import ButtonOCR from './ButtonOCR';
import ButtonPublish from './ButtonPublish';
import ButtonPublishWithAddictional from './ButtonPublishWithAddictional';
import ButtonRequestComment from './ButtonRequestComment';
import ButtonRequestSignature from './ButtonRequestSignature';
const ACTIONS_BY_STATUS = {
  [DOCUMENT_STATUS.OCR.value]: [ButtonOCR],
  [DOCUMENT_STATUS.PENDING_SIGNATURE_REQUEST.value]: [ButtonRequestSignature, ButtonExportExcel],
  [DOCUMENT_STATUS.PENDING_ASSIGNEE.value]: [ButtonOCR, ButtonExportExcel],
  [DOCUMENT_STATUS.DONE_PROCESS.value]: [ButtonExportExcel],
  [DOCUMENT_STATUS.WAITING_FOR_NUMBER.value]: [
    ButtonCreateNumberThenPublish,
    ButtonCreateNumberThenHold,
    ButtonExportExcel,
  ],
  [DOCUMENT_STATUS.PENDING_PUBLISH.value]: [
    ButtonOCR,
    ButtonCreateNumberThenPublish,
    ButtonPublish,
    ButtonExportExcel,
  ],
  [DOCUMENT_STATUS.PUBLISHED.value]: [ButtonOCR, ButtonPublishWithAddictional, ButtonExportExcel],
  [DOCUMENT_STATUS.INTERNAL.value]: [ButtonExportExcel],
  [DOCUMENT_STATUS.BEING_RETURN.value]: [ButtonExportExcel],
  [DOCUMENT_STATUS.RETURN.value]: [ButtonExportExcel],
  [DOCUMENT_STATUS.WAITING_FOR_LEADERS_COMMENTS.value]: [ButtonRequestComment, ButtonExportExcel],
  [DOCUMENT_STATUS.LEADERS_HAVE_COMMENTED.value]: [ButtonExportExcel],
};
export default function ListActions(props: Partial<GridContainerProps>) {
  const status = useAsyncListGetter((s) => s?.filter?.Status);
  const $Buttons = useMemo(() => {
    if (!status) return null;
    const actions = (ACTIONS_BY_STATUS as any)[status as any] as ComponentType<any>[];
    if (!(actions instanceof Array && actions.length > 0)) return null;
    return actions.map((Item, i) => (
      <ListActionButtonItem key={i}>
        <Item />
      </ListActionButtonItem>
    ));
  }, [status]);
  return <ListActionButtonContainer {...props}>{$Buttons}</ListActionButtonContainer>;
}
