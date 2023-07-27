import intOrDefault from '@/helpers/formatHelpers/intOrDefault';
import useQueryString from '@/hooks/useQueryString';
import { useAsyncListAction, useAsyncListGetter } from '../context';
import { useEffect } from 'react';
export const QS_PAGE_INDEX = 'pageIndex';
export const QS_PAGE_SIZE = 'pageSize';
export default function QueryStringInitializer() {
  const qs = useQueryString();
  const [pageIndexFromQS, pageSizeFromQS] = [
    intOrDefault(qs.get(QS_PAGE_INDEX), 1),
    intOrDefault(qs.get(QS_PAGE_SIZE), 10),
  ];
  const pageIndex = useAsyncListGetter((s) => s.pageIndex);
  const pageSize = useAsyncListGetter((s) => s.pageSize);
  const { updatePaging } = useAsyncListAction();
  useEffect(() => {
    setTimeout(() => {
      if (pageIndex === pageIndexFromQS && pageSize === pageSizeFromQS) return;
      updatePaging?.(pageIndexFromQS, pageSizeFromQS);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
