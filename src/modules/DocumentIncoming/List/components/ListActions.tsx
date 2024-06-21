import BoxHorizontalSrcoll from '@/components/box/BoxHorizontalSrcoll';
import { GridContainer, GridContainerProps, GridItem, GridItemProps } from '@/components/grid';
import { ComponentType, useMemo } from 'react';
import { DOCUMENT_STATUS } from '../../constants';
import { useAsyncListGetter } from '../context';
import ButtonExportExcel from './ButtonExportExcel';
import ButtonInsertDocumentRecord from './ButtonInsertDocumentRecord';
import ButtonOCR from './ButtonOCR';
import ButtonRequestComment from './ButtonRequestComment';
function GridItemButton(props: GridItemProps) {
  const { children, sx, ...otherProps } = props;
  return (
    <GridItem disabledXs sx={{ py: '7px', px: 0.5, ...sx }} {...otherProps}>
      {children}
    </GridItem>
  );
}
const ACTIONS_BY_STATUS = {
  [DOCUMENT_STATUS.OCR.value]: [ButtonOCR],
  [DOCUMENT_STATUS.PENDING_RECORDED.value]: [ButtonInsertDocumentRecord, ButtonExportExcel],
  [DOCUMENT_STATUS.PENDING_ASSIGNEE.value]: [ButtonOCR, ButtonExportExcel],
  [DOCUMENT_STATUS.IN_PROCESS.value]: [ButtonOCR, ButtonExportExcel],
  [DOCUMENT_STATUS.DONE_PROCESS.value]: [ButtonExportExcel],
  [DOCUMENT_STATUS.BEING_RETURN.value]: [ButtonExportExcel],
  [DOCUMENT_STATUS.RETURN.value]: [ButtonExportExcel],
  [DOCUMENT_STATUS.WITH_DRAW.value]: [ButtonExportExcel],
  [DOCUMENT_STATUS.WAITING_FOR_LEADERS_COMMENTS.value]: [ButtonRequestComment, ButtonExportExcel],
  [DOCUMENT_STATUS.LEADERS_HAVE_COMMENTED.value]: [ButtonExportExcel],
  [DOCUMENT_STATUS.RECEIVED_NOT_ACTION.value]: [ButtonExportExcel],
};
export default function ListActions(props: Partial<GridContainerProps>) {
  const status = useAsyncListGetter((s) => s?.filter?.Status);
  const $Buttons = useMemo(() => {
    if (!status) return null;
    const actions = (ACTIONS_BY_STATUS as any)[status as any] as ComponentType<any>[];
    if (!(actions instanceof Array && actions.length > 0)) return null;
    return actions.map((Item, i) => (
      <GridItemButton key={i}>
        <Item />
      </GridItemButton>
    ));
  }, [status]);
  return (
    <GridContainer {...props} justifyContent="flex-end">
      <BoxHorizontalSrcoll height="40px" togglable>
        {$Buttons}
      </BoxHorizontalSrcoll>
    </GridContainer>
  );
}
