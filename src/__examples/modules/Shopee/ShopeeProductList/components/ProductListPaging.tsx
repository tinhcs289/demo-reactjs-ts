import { CommonPagination } from '@/components/table';
import { HttpRequestStatus } from '@/constants/apiRequestStatus';
import { useCallback, useMemo } from 'react';
import { PAGE_SIZE } from '../constants';
import { useAsyncListGetter, useAsyncListAction } from '../context';
export default function ProductListPaging() {
  const pageIndex = useAsyncListGetter((s) => s.pageIndex);
  const pageSize = useAsyncListGetter((s) => s.pageSize);
  const totalCount = useAsyncListGetter((s) => s.totalCount);
  const fetchStatus = useAsyncListGetter((s) => s.fetchStatus);
  const isLoading = useMemo(() => fetchStatus === HttpRequestStatus.REQUESTING, [fetchStatus]);
  const { updatePaging } = useAsyncListAction();
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
