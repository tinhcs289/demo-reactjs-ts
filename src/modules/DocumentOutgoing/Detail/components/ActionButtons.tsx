import { ButtonPositive } from '@/components/buttons';
import { useRHFSubmitDispatch } from '@/components/form';
import { GridItem, GridItemProps } from '@/components/grid';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import GradingIcon from '@mui/icons-material/Grading';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useCallback, type MouseEventHandler, useMemo } from 'react';
import { MUTATE_ACTION } from '../constants';
import { useFormState } from '../context';
import BorderColorIcon from '@mui/icons-material/BorderColor';
function GridItemAction(props: Partial<GridItemProps>) {
  const { children, sx, ...otherProps } = props;
  return (
    <GridItem disabledXs sx={{ py: '7px', px: 0.5, ...sx }} {...otherProps}>
      {children}
    </GridItem>
  );
}
/**
 * Lưu
 */
function Save() {
  const { dispatchSubmit } = useRHFSubmitDispatch();
  const viewType = useFormState((s) => s?.viewType);
  const action = useMemo(() => {
    if (viewType === 'creation') return MUTATE_ACTION.CREATE;
    if (viewType === 'editable') return MUTATE_ACTION.UPDATE;
    return '';
  }, [viewType]);
  const buttonLabel = useMemo(() => {
    if (viewType === 'creation') return 'Tạo';
    return 'Lưu';
  }, [viewType]);
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      dispatchSubmit?.(action);
    },
    [dispatchSubmit, action]
  );
  const $Icon = useMemo(() => {
    if (viewType === 'creation') return <NoteAddIcon />;
    return <SaveAsIcon />;
  }, [viewType]);
  return (
    <GridItemAction>
      <ButtonPositive startIcon={$Icon} onClick={handleClick}>
        {buttonLabel}
      </ButtonPositive>
    </GridItemAction>
  );
}
/**
 * Lưu và Trình
 */
function SaveThenRequestSign() {
  const { dispatchSubmit } = useRHFSubmitDispatch();
  const viewType = useFormState((s) => s?.viewType);
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      dispatchSubmit?.('request_sign');
    },
    [dispatchSubmit]
  );
  const $Icon = useMemo(() => {
    if (viewType === 'creation') return <NoteAddIcon />;
    return <BorderColorIcon />;
  }, [viewType]);
  const buttonLabel = useMemo(() => {
    if (viewType === 'creation') return 'Tạo và Trình';
    return 'Trình ký';
  }, [viewType]);
  const $EndIcon = useMemo(() => {
    if (viewType === 'creation') return <AssignmentReturnIcon sx={{ transform: `rotateY(-180deg)` }} />;
    return undefined;
  }, [viewType]);
  return (
    <GridItemAction>
      <ButtonPositive startIcon={$Icon} endIcon={$EndIcon} color="success" onClick={handleClick}>
        {buttonLabel}
      </ButtonPositive>
    </GridItemAction>
  );
}
/**
 * Phân xử lý
 */
function SaveThenAssign() {
  const { dispatchSubmit } = useRHFSubmitDispatch();
  const viewType = useFormState((s) => s?.viewType);
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      dispatchSubmit?.('create_assigment');
    },
    [dispatchSubmit]
  );
  return viewType !== 'creation' ? (
    <GridItemAction>
      <ButtonPositive
        startIcon={<AssignmentReturnIcon sx={{ transform: `rotateY(-180deg)` }} />}
        onClick={handleClick}
      >
        {'Phân xử lý'}
      </ButtonPositive>
    </GridItemAction>
  ) : null;
}
/**
 * Hoàn thành
 */
function Complete() {
  const { dispatchSubmit } = useRHFSubmitDispatch();
  const viewType = useFormState((s) => s?.viewType);
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      dispatchSubmit?.(MUTATE_ACTION.CREATE);
    },
    [dispatchSubmit]
  );
  const $Button = useMemo(() => {
    if (viewType === 'creation') return null;
    return (
      <GridItemAction>
        <ButtonPositive startIcon={<CheckCircleIcon />} color="success" onClick={handleClick}>
          {'Hoàn thành'}
        </ButtonPositive>
      </GridItemAction>
    );
  }, [viewType, handleClick]);
  return $Button;
}
/**
 * Duyệt
 */
function Approve() {
  const { dispatchSubmit } = useRHFSubmitDispatch();
  const viewType = useFormState((s) => s?.viewType);
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      dispatchSubmit?.(MUTATE_ACTION.CREATE);
    },
    [dispatchSubmit]
  );
  const $Button = useMemo(() => {
    if (viewType === 'creation') return null;
    return (
      <GridItemAction>
        <ButtonPositive startIcon={<GradingIcon />} color="success" onClick={handleClick}>
          {'Duyệt'}
        </ButtonPositive>
      </GridItemAction>
    );
  }, [viewType, handleClick]);
  return $Button;
}
/**
 * Trả lại
 */
function Return() {
  const { dispatchSubmit } = useRHFSubmitDispatch();
  const viewType = useFormState((s) => s?.viewType);
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      dispatchSubmit?.(MUTATE_ACTION.CREATE);
    },
    [dispatchSubmit]
  );
  const $Button = useMemo(() => {
    if (viewType === 'creation') return null;
    return (
      <GridItemAction>
        <ButtonPositive startIcon={<AssignmentReturnIcon />} color="error" onClick={handleClick}>
          {'Trả lại'}
        </ButtonPositive>
      </GridItemAction>
    );
  }, [viewType, handleClick]);
  return $Button;
}
// ================
export default function ActionButtons() {
  return (
    <>
      <Save />
      <SaveThenAssign />
      <SaveThenRequestSign />
      <Approve />
      <Complete />
      <Return />
    </>
  );
}
