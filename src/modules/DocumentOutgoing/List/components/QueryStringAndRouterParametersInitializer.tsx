import intOrDefault from '@/helpers/formatHelpers/intOrDefault';
import useQueryString from '@/hooks/useQueryString';
import { useAsyncListAction, useAsyncListGetter } from '../context';
import { useEffect } from 'react';
import { QS_LIST } from '../../constants';
import type { SortDirect } from '@/helpers/contextHelpers/createAsyncListContextWithComponents';
import { useParams } from 'react-router-dom';
import type { RowDataStatus } from '../_types';
/**
 * @note if add `QueryStringInitializer` to the List, should pass the prop `queryOnFirstLoad=false` to the AsyncListProvider
 */
export default function QueryStringAndRouterParametersInitializer() {
  const qs = useQueryString();
  const [pageIndexFromQS, pageSizeFromQS, sortByFromQS, sortDirectionFromQS] = [
    intOrDefault(qs.get(QS_LIST.PAGE_INDEX), 1),
    intOrDefault(qs.get(QS_LIST.PAGE_SIZE), 10),
    qs.get(QS_LIST.SORT_BY) || null,
    (() => {
      const dir = qs.get(QS_LIST.SORT_DIRIECTION) as SortDirect | undefined;
      if (dir === 'ASC' || dir === 'DESC') return dir;
      return null;
    })(),
  ];
  const pageIndex = useAsyncListGetter((s) => s.pageIndex);
  const pageSize = useAsyncListGetter((s) => s.pageSize);
  const sortBy = useAsyncListGetter((s) => s.sortBy);
  const sortDirection = useAsyncListGetter((s) => s.sortDirection);
  const { refetch } = useAsyncListAction();
  const { documentStatus: statusFromRouter } = useParams();
  const filter = useAsyncListGetter((s) => s.filter);
  type InitParams = Partial<Parameters<typeof refetch>[0]>;
  useEffect(() => {
    setTimeout(() => {
      const intParams: InitParams = {};
      if (!!pageIndexFromQS && pageIndexFromQS !== pageIndex) {
        intParams.pageIndex = pageIndexFromQS;
      }
      if (!!pageSizeFromQS && pageSizeFromQS !== pageSize) {
        intParams.pageSize = pageSizeFromQS;
      }
      if (!!sortByFromQS && sortByFromQS !== sortBy) {
        intParams.sortBy = sortByFromQS;
      }
      if (!!sortDirectionFromQS && sortDirectionFromQS !== sortDirection) {
        intParams.sortDirection = sortDirectionFromQS;
      }
      if (!!statusFromRouter && filter?.Status?.[0] !== statusFromRouter) {
        intParams.filter = {
          ...filter,
          Status: [statusFromRouter as RowDataStatus],
        };
      }
      if (Object.keys(intParams).length === 0) return;
      refetch?.(intParams);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFromRouter]);
  return <></>;
}
