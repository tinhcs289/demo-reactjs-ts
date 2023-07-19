import { GridContainer, GridContainerProps } from '@/components/grid';
import wait from '@/functions/wait';
import { lazy, useCallback } from 'react';
import type { FormFilterDocumentIncommingProps } from '@/modules/FormFilterDocumentIncomming';
import { useAsyncListAction } from '../context';
import type { QueryParams } from '../_types';
const FormFilterDocumentIncomming = lazy(() =>
  wait(0).then(() => import('@/modules/FormFilterDocumentIncomming'))
);
type OnSubmitHandler = Required<FormFilterDocumentIncommingProps>['onSubmit'];
export default function FilterForm(props: GridContainerProps) {
  const { updateFilter } = useAsyncListAction();
  const handleChange: OnSubmitHandler = useCallback(
    (values, _reason) => {
      const filter: Partial<QueryParams> = {};
      if (!!values.Keyword && !!values.Keyword.trim()) {
        filter.KeySearch = values.Keyword.trim();
      }
      if (Array.isArray(values.Status) && values.Status.length > 0) {
        filter.Status = values.Status.map((s) => s.value);
      }
      if (Object.keys(filter).length > 0) {
        updateFilter?.(filter);
        return;
      }
      updateFilter?.(null);
      return;
    },
    [updateFilter]
  );
  return (
    <GridContainer {...props}>
      <FormFilterDocumentIncomming onSubmit={handleChange} />
    </GridContainer>
  );
}
