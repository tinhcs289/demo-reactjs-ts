import { GridContainer, GridContainerProps } from '@/components/grid';
import wait from '@/functions/wait';
import type { FormFilterDocumentIncommingProps } from '@/modules/FormFilterDocumentIncomming';
import { useMediaQuery, useTheme } from '@mui/material';
import { lazy, useCallback, useMemo } from 'react';
import type { QueryParams } from '../_types';
import { useAsyncListAction } from '../context';
const FormFilterDocumentIncomming = lazy(() =>
  wait(0).then(() => import('@/modules/FormFilterDocumentIncomming'))
);
type OnSubmitHandler = Required<FormFilterDocumentIncommingProps>['onSubmit'];
export default function FilterForm(props: GridContainerProps) {
  const theme = useTheme();
  const isMediumScreenOrLarger = useMediaQuery(theme.breakpoints.up('md'));
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
  const rootProps: Partial<GridContainerProps> = useMemo(() => {
    if (isMediumScreenOrLarger) return { flex: 1 };
    return { width: '100%' };
  }, [isMediumScreenOrLarger]);
  return (
    <GridContainer item {...rootProps} {...props}>
      <FormFilterDocumentIncomming onSubmit={handleChange} />
    </GridContainer>
  );
}
