import { GridContainerProps } from '@/components/grid';
import { ListFilterContainer } from '@/containers/ListFilterContainer';
import wait from '@/helpers/asyncHelpers/wait';
import { lazy, useCallback, useMemo, useRef } from 'react';
import type { FormValues as FilterValues, FormProps as FormFilterProps } from '../../Filter/_types';
import { statusOptions } from '../../Filter/constants';
import type { QueryParams, RowDataStatus } from '../_types';
import { useAsyncListAction, useAsyncListGetter } from '../context';
import moment from 'moment';
import toBeginOfDay from '@/helpers/formatHelpers/toBeginOfDay';
import toEndOfDay from '@/helpers/formatHelpers/toEndOfDay';
const Form = lazy(() => wait().then(() => import('../../Filter')));
function getQueryParamsFromFilterForm(values: Partial<FilterValues>, _reason?: string): Partial<QueryParams> {
  const filter: Partial<QueryParams> = {};
  if (!!values.Keyword && !!values.Keyword.trim()) {
    filter.Keyword = values.Keyword.trim();
  }
  if (Array.isArray(values.Status) && values.Status.length > 0) {
    filter.Status = values.Status.map((s) => s.value as RowDataStatus);
  }
  return filter;
}
function getFilterValuesFromQueryParams(params?: Partial<QueryParams>): Partial<FilterValues> | undefined {
  const { Keyword, Status } = params || {};
  if (!params || Object.keys(params).length === 0) {
    return undefined;
  }
  const values: Partial<FilterValues> = {};
  if (!!Keyword && !!Keyword.trim()) {
    values.Keyword = Keyword.trim();
  }
  if (Status instanceof Array && Status.length > 0) {
    values.Status = statusOptions.filter((o) => Status.includes(o.value as any));
  }
  return values;
}
const DEFAULT_FILTER: Partial<FilterValues> = {
  DateReceived: {
    From: toBeginOfDay(moment().add(-1, 'M')),
    To: toEndOfDay(moment()),
  },
};
type OnSubmitHandler = Required<FormFilterProps>['onSubmit'];
export default function FilterForm(props: GridContainerProps) {
  const { updateFilter } = useAsyncListAction();
  const listFilter = useAsyncListGetter((s) => s?.filter);
  const isChangeByFilterRef = useRef<boolean>(false);
  const handleChange: OnSubmitHandler = useCallback(
    (values, _reason) => {
      isChangeByFilterRef.current = true;
      const filter = getQueryParamsFromFilterForm(values);
      if (Object.keys(filter).length > 0) {
        updateFilter?.(filter);
        return;
      }
      updateFilter?.(null);
      return;
    },
    [updateFilter]
  );
  const filterValues: Partial<FilterValues> | undefined = useMemo(
    function updateFormValuesWhenListFilterChanges() {
      if (!listFilter || Object.keys(listFilter).length === 0) {
        return undefined;
      }
      return getFilterValuesFromQueryParams(listFilter);
    },
    [listFilter]
  );
  return (
    <ListFilterContainer {...props}>
      <Form onSubmit={handleChange} defaultValues={DEFAULT_FILTER} values={filterValues} />
    </ListFilterContainer>
  );
}
