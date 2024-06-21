import { ButtonPositive } from '@/components/buttons';
import { useRHFSubmitDispatch } from '@/components/form';
import { GridItem } from '@/components/grid';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import type { MouseEventHandler } from 'react';
export default function ActionButtons() {
  const { dispatchSubmit } = useRHFSubmitDispatch();
  const handleAction =
    (action: string): MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      event?.stopPropagation?.();
      dispatchSubmit?.(action);
    };
  return (
    <>
      <GridItem disabledXs sx={{ py: '7px', px: 0.5 }}>
        <ButtonPositive
          startIcon={<AssignmentReturnIcon sx={{ transform: `rotateY(-180deg)` }} />}
          onClick={handleAction('save')}
        >
          {`Duyệt`}
        </ButtonPositive>
      </GridItem>
    </>
  );
}
