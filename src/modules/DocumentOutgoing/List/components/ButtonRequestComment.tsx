import { ButtonPositive } from '@/components/buttons';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useCallback, useMemo } from 'react';
import { useAsyncListAction, useAsyncListGetter } from '../context';
export default function ButtonRequestComment() {
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
      color="info"
      startIcon={<RateReviewIcon />}
      onClick={handleClick}
      noWrap
    >
      {!selectCount ? 'Xin Ý Kiến' : `Xin Ý Kiến (${selectCount})`}
    </ButtonPositive>
  );
}
