import { CommonPagination } from '@/components/CommonTable';
import { ERequestStatus } from '@/hooks/useAsyncListState/constants';
import { useCallback, useMemo } from 'react';
import { PAGE_SIZE } from '../constants';
import { useAsyncList } from '../context';

export default function ProductListPaging() {
  const [pageIndex] = useAsyncList((s) => s.listState.pageIndex);
  const [pageSize] = useAsyncList((s) => s.listState.pageSize);
  const [totalCount] = useAsyncList((s) => s.listState.totalCount);
  const [updatePaging] = useAsyncList((s) => s.control?.updatePaging);
  const [fetchState] = useAsyncList((s) => s.fetchState);

  const isLoading = useMemo(() => fetchState === ERequestStatus.REQUESTING, [fetchState]);

  const handleChangePage = useCallback(
    (page: number) => {
      updatePaging?.(page, PAGE_SIZE);
    },
    [updatePaging]
  );

  return (
    <CommonPagination
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalCount={totalCount}
      onChange={handleChangePage}
      disabled={isLoading}
      sx={{ py: 2 }}
    />
  );
}
