import { createCellInnerComponent } from '@/components/table';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useCallback } from 'react';
import { DOCUMENT_STATUS, MUTATE_ACTION } from '../../constants';
import type { RowData } from '../_types';
import { AsyncListItemActionsPopoverToggle, useAsyncListAction, useAsyncListGetter } from '../context';
/**
 * Xem luồng xử ký / lịch sử xử lý
 */
function ViewProccesFlow(_props: { row: RowData }) {
  const toggleForm: Required<IconButtonProps>['onClick'] = useCallback((event) => {
    event?.stopPropagation?.();
    return;
  }, []);
  return (
    <Tooltip title="Xem luồng xử lý">
      <IconButton color="primary" onClick={toggleForm}>
        <AccountTreeIcon />
      </IconButton>
    </Tooltip>
  );
}
/**
 * Tạo bản sao
 */
function Clone(_props: { row: RowData }) {
  const toggleForm: Required<IconButtonProps>['onClick'] = useCallback((event) => {
    event?.stopPropagation?.();
    return;
  }, []);
  return (
    <Tooltip title="Tạo bản sao">
      <IconButton color="primary" onClick={toggleForm}>
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  );
}
/**
 * Phân xử lý
 */
function Assign(props: { row: RowData }) {
  const { row } = props;
  const { setAction } = useAsyncListAction();
  const toggleForm: Required<IconButtonProps>['onClick'] = useCallback(
    (event) => {
      event?.stopPropagation?.();
      setAction?.({ item: row, action: MUTATE_ACTION.CREATE_ASSIGNMENT });
      return;
    },
    [setAction, row]
  );
  return (
    <Tooltip title="Phân xử lý">
      <IconButton color="primary" onClick={toggleForm}>
        <AssignmentReturnIcon sx={{ transform: `rotateY(-180deg)` }} />
      </IconButton>
    </Tooltip>
  );
}
/**
 * Duyệt
 */
function Approve(props: { row: RowData }) {
  const { row } = props;
  const { setAction } = useAsyncListAction();
  const status = useAsyncListGetter((s) => s?.filter?.Status?.[0]);
  const toggleForm: Required<IconButtonProps>['onClick'] = useCallback(
    (event) => {
      event?.stopPropagation?.();
      setAction?.({ item: row, action: MUTATE_ACTION.APPROVE });
      return;
    },
    [setAction, row]
  );
  return (
    <>
      {status === DOCUMENT_STATUS.PENDING_ASSIGNEE.value ||
      status === DOCUMENT_STATUS.PENDING_SIGNATURE_REQUEST.value ? (
        <Tooltip title="Duyệt">
          <IconButton color="primary" onClick={toggleForm}>
            <PlaylistAddCheckIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </>
  );
}
/**
 * Trình ký
 */
function RequestSign(props: { row: RowData }) {
  const { row } = props;
  const { setAction } = useAsyncListAction();
  const status = useAsyncListGetter((s) => s?.filter?.Status?.[0]);
  const toggleForm: Required<IconButtonProps>['onClick'] = useCallback(
    (event) => {
      event?.stopPropagation?.();
      setAction?.({ item: row, action: MUTATE_ACTION.REQUEST_SIGN });
      return;
    },
    [setAction, row]
  );
  return (
    <>
      {status === DOCUMENT_STATUS.PENDING_SIGNATURE_REQUEST.value ||
      status === DOCUMENT_STATUS.PENDING_ASSIGNEE.value ? (
        <Tooltip title="Trình ký">
          <IconButton color="primary" onClick={toggleForm}>
            <BorderColorIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </>
  );
}
// ============================
const CellAction = createCellInnerComponent<RowData>(function Actions(props) {
  const { row } = props;
  return (
    <ButtonGroup fullWidth size="small">
      <ViewProccesFlow row={row} />
      <Clone row={row} />
      <Approve row={row} />
      <RequestSign row={row} />
      <Assign row={row} />
      <AsyncListItemActionsPopoverToggle row={row} />
    </ButtonGroup>
  );
});
export default CellAction;
