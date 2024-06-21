import type { ButtonCommonProps } from '@/components/buttons';
import { ButtonPositive } from '@/components/buttons';
import wait from '@/helpers/asyncHelpers/wait';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { lazy, useCallback } from 'react';
import { MUTATE_ACTION } from '../../constants';
import { useAsyncListAction } from '../context';
const Dialog = lazy(() => wait().then(() => import('../components-imported/DialogCreate')));
export default function ButtonInsertDocumentRecord() {
  const { setAction } = useAsyncListAction();
  const handleClick: Required<ButtonCommonProps>['onClick'] = useCallback(
    (event) => {
      event?.stopPropagation?.();
      setAction?.({ action: MUTATE_ACTION.CREATE });
      return;
    },
    [setAction]
  );
  return (
    <>
      <ButtonPositive startIcon={<PostAddIcon />} onClick={handleClick} noWrap>
        {`Vào sổ văn bản`}
      </ButtonPositive>
      <Dialog />
    </>
  );
}
