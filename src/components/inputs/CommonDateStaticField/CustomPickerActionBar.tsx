import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import type { DialogActionsProps } from '@mui/material/DialogActions';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useMemo } from 'react';
import type { CustomPickerActionBarProps } from './_types';
const DialogActionsStyled = styled(DialogActions)<DialogActionsProps>(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  gridRow: '1 !important',
  gridColumn: '4 !important',
}));
export default function CustomPickerActionBar(props: CustomPickerActionBarProps) {
  const { onAccept, onClear, onCancel, className, buttonOk, clearable, ButtonNegative, closeOnSelect } =
    props;
  const $ButtonClear = useMemo(() => {
    return !!clearable ? (
      <IconButton onClick={onClear}>
        <CloseIcon />
      </IconButton>
    ) : null;
  }, [onClear, clearable]);
  const $ButtonOk = useMemo(() => {
    if (!buttonOk || !!closeOnSelect) return null;
    return (
      <Button color="primary" onClick={onAccept}>
        {buttonOk}
      </Button>
    );
  }, [buttonOk, closeOnSelect, onAccept]);
  const $ButtonNegative = useMemo(() => {
    if (!ButtonNegative) return null;
    return <Button onClick={onCancel}>{ButtonNegative}</Button>;
  }, [ButtonNegative, onCancel]);
  return (
    <DialogActionsStyled className={className}>
      {$ButtonClear}
      {$ButtonOk}
      {$ButtonNegative}
    </DialogActionsStyled>
  );
}
