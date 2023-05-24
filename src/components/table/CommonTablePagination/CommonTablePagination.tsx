import intOrDefault from '@/helpers/formatHelpers/intOrDefault';
import { styled } from '@mui/material';
import type { TablePaginationProps } from '@mui/material/TablePagination';
import TablePagination from '@mui/material/TablePagination';
import upperFirst from 'lodash/upperFirst';
import type { ChangeEvent } from 'react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { CommonTablePaginationProps } from './_types';
const TablePaginationStyled = styled(TablePagination)<TablePaginationProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
}));
export default function CommonTablePagination(props: CommonTablePaginationProps) {
  const {
    pageIndex: pi,
    pageSize: ps,
    totalCount,
    onChange,
    labelDisplayedRows: ldr,
    getItemAriaLabel: gial,
    labelRowsPerPage: lrpp,
    loading,
    ...otherProps
  } = props;
  const { t } = useTranslation();
  const pageIndex = useMemo(() => (Number.isInteger(pi) && pi > 0 ? pi - 1 : 0), [pi]);
  const pageSize = useMemo(() => (Number.isInteger(ps) ? Number(ps) : 10), [ps]);
  const labelRowsPerPage = useMemo(() => lrpp || t('common:table.rowsPerPage'), [t, lrpp]);
  const handleChange = useCallback(
    (field?: 'pageIndex' | 'pageSize') => {
      return (event: ChangeEvent<unknown>, page: number) => {
        event?.stopPropagation?.();
        event?.preventDefault?.();
        if (!field) return;
        switch (field) {
          case 'pageIndex':
            onChange?.(page + 1, pageSize);
            break;
          case 'pageSize':
            const size = intOrDefault((event?.target as any)?.value, pageSize);
            onChange?.(1, size);
            break;
          default:
            return;
        }
      };
    },
    [onChange, pageSize]
  );
  const labelDisplayedRows = useCallback(
    (args: { from: number; to: number; count: number; page: number }) => {
      return typeof ldr === 'function' ? ldr(args as any) : t('common:table.displayedRows', args);
    },
    [t, ldr]
  );
  const getItemAriaLabel = useCallback(
    (type: 'first' | 'last' | 'next' | 'previous') => {
      return typeof gial === 'function' ? gial(type) : t(`common:table.goTo${upperFirst(type)}Page`);
    },
    [t, gial]
  );
  return (
    <TablePaginationStyled
      //@ts-ignore
      component="div"
      rowsPerPageOptions={[10, 20, 50, 100]}
      {...otherProps}
      onPageChange={handleChange('pageIndex') as any}
      onRowsPerPageChange={handleChange('pageSize') as any}
      count={totalCount || 0}
      page={pageIndex}
      rowsPerPage={pageSize}
      getItemAriaLabel={getItemAriaLabel}
      labelRowsPerPage={labelRowsPerPage}
      labelDisplayedRows={labelDisplayedRows}
    />
  );
}
