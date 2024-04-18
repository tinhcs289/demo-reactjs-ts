import { ButtonPositive } from '@/components/buttons';
import PublicIcon from '@mui/icons-material/Public';
import { useCallback, useMemo } from 'react';
import { useAsyncListAction, useAsyncListGetter } from '../context';
export default function ButtonPublishWithAddictional() {
  const items = useAsyncListGetter((s) => s?.selectedItems);
  const selectCount = useMemo(() => items?.length || 0, [items?.length]);
  const disabled = useMemo(() => selectCount === 0, [selectCount]);
  const { checkAll } = useAsyncListAction();
  const handleClick = useCallback(() => {
    checkAll?.(false);
  }, [checkAll]);
  return (
    <ButtonPositive
      disabled={disabled}
      color="success"
      startIcon={<PublicIcon />}
      onClick={handleClick}
      noWrap
    >
      {!selectCount ? 'Ban hành và bổ sung' : `Ban hành và bổ sung (${selectCount})`}
    </ButtonPositive>
  );
}
