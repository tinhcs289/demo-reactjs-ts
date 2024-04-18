import { ButtonNegative } from '@/components/buttons';
import { CommonDialogTitle } from '@/components/dialogs';
import { useRHFSubmitDispatch } from '@/components/form';
import { H6 } from '@/components/typo';
import Box from '@mui/material/Box';
import type { DialogTitleProps } from '@mui/material/DialogTitle';
import { useCallback } from 'react';
import type { MouseEventHandler } from 'react';
export default function DialogFormTitle(props: DialogTitleProps<'div'>) {
  const { dispatchClose } = useRHFSubmitDispatch();
  const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e?.stopPropagation?.();
      dispatchClose?.({ reason: 'force_close' });
    },
    [dispatchClose]
  );
  return (
    <CommonDialogTitle
      {...(props as any)}
      sx={{
        display: 'flex',
      }}
    >
      <Box flexGrow={1}>
        <H6>{`Duyệt văn bản`}</H6>
      </Box>
      <Box>
        <ButtonNegative onClick={handleClose}>{`Đóng`}</ButtonNegative>
      </Box>
    </CommonDialogTitle>
  );
}
