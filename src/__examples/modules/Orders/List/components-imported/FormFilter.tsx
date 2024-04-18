import { GridContainer, GridContainerProps } from '@/components/grid';
import wait from '@/helpers/asyncHelpers/wait';
import { useMediaQuery, useTheme } from '@mui/material';
import { ComponentType, lazy, useCallback, useMemo } from 'react';
import type { FormProps as FormFilterProps } from '../../Filter';
import type { QueryParams } from '../_types';
import { useAsyncListAction } from '../context';
const Form = lazy(() => wait().then(() => import('../../Filter'))) as ComponentType<FormFilterProps>;
type OnSubmitHandler = Required<FormFilterProps>['onSubmit'];
export default function FormFilter(props: GridContainerProps) {
  const theme = useTheme();
  const isMediumScreenOrLarger = useMediaQuery(theme.breakpoints.up('md'));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updateFilter, reload } = useAsyncListAction();
  const handleChange: OnSubmitHandler = useCallback(
    (values, _reason) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const filter: Partial<QueryParams> = {};
      // if (!!values.Keyword && !!values.Keyword.trim()) {
      //   filter.KeySearch = values.Keyword.trim();
      // }
      // if (Array.isArray(values.Status) && values.Status.length > 0) {
      //   filter.Status = values.Status.map((s) => s.value);
      // }
      // if (Object.keys(filter).length > 0) {
      //   updateFilter?.(filter);
      //   return;
      // }
      // updateFilter?.(null);
      reload?.();
      return;
    },
    [reload] //[updateFilter]
  );
  const rootProps: Partial<GridContainerProps> = useMemo(() => {
    if (isMediumScreenOrLarger) return { flex: 1 };
    return { width: '100%' };
  }, [isMediumScreenOrLarger]);
  return (
    <GridContainer item {...rootProps} {...props}>
      <Form onSubmit={handleChange} />
    </GridContainer>
  );
}
