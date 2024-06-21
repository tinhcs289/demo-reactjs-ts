import { ButtonNegative } from '@/components/buttons';
import { CommonDialogTitle } from '@/components/dialogs';
import { useRHFSubmitDispatch } from '@/components/form';
import { H6 } from '@/components/typo';
import Box from '@mui/material/Box';
import type { DialogTitleProps } from '@mui/material/DialogTitle';
import { useCallback, useMemo } from 'react';
import type { MouseEventHandler } from 'react';
import { useFormState } from '../context';
export default function DialogFormTitle(props: DialogTitleProps<'div'>) {
  const { dispatchClose } = useRHFSubmitDispatch();
  const viewType = useFormState((s) => s?.viewType);
  const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e?.stopPropagation?.();
      dispatchClose?.({ reason: 'force_close' });
    },
    [dispatchClose]
  );
  const title = useMemo(() => {
    if (viewType === 'creation') return 'Vào sổ văn bản';
    if (viewType === 'editable') return 'Thông tin văn bản';
    return '';
  }, [viewType]);
  return (
    <CommonDialogTitle display="flex" {...(props as any)}>
      <Box flexGrow={1}>
        <H6>{title}</H6>
      </Box>
      <Box>
        <ButtonNegative onClick={handleClose}>{`Đóng`}</ButtonNegative>
      </Box>
    </CommonDialogTitle>
  );
}
