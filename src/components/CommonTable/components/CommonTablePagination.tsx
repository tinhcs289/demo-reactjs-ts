import intOrDefault from '@/helpers/formatHelpers/intOrDefault';
import TablePagination from '@mui/material/TablePagination';
import upperFirst from 'lodash/upperFirst';
import type { ChangeEvent, FC } from 'react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ICommonTablePaginationProps } from '../_types';

const CommonTablePagination: FC<ICommonTablePaginationProps> = (props) => {
  const { t } = useTranslation();

  const {
    pageIndex,
    pageSize,
    totalCount,
    onChange,
    sx,
    labelDisplayedRows,
    getItemAriaLabel,
    labelRowsPerPage,
    loading,
    ...otherProps
  } = props;

  const __pageIndex = useMemo(() => {
    return Number.isInteger(pageIndex) && pageIndex > 0 ? pageIndex - 1 : 0;
  }, [pageIndex]);

  const memoStyle = useMemo(() => {
    return { display: 'flex', justifyContent: 'center', ...sx };
  }, [sx]);

  const memoProps = useMemo(() => {
    return otherProps;
  }, [otherProps]);

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
            break;
        }
        return;
      };
    },
    [onChange, pageSize]
  );

  const __labelRowsPerPage = useMemo(() => {
    return labelRowsPerPage || t('common:table.rowsPerPage');
  }, [t, labelRowsPerPage]);

  const __labelDisplayedRows = useCallback(
    (args: { from: number; to: number; count: number; page: number }) => {
      return typeof labelDisplayedRows === 'function'
        ? labelDisplayedRows(args as any)
        : t('common:table.displayedRows', args);
    },
    [t, labelDisplayedRows]
  );

  const __getItemAriaLabel = useCallback(
    (type: 'first' | 'last' | 'next' | 'previous') => {
      return typeof getItemAriaLabel === 'function'
        ? getItemAriaLabel(type)
        : t(`common:table.goTo${upperFirst(type)}Page`);
    },
    [t, getItemAriaLabel]
  );

  const pagination = useMemo(() => {
    return (
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 20, 50, 100]}
        {...memoProps}
        sx={memoStyle}
        onPageChange={handleChange('pageIndex') as any}
        onRowsPerPageChange={handleChange('pageSize') as any}
        count={totalCount || 0}
        page={__pageIndex}
        rowsPerPage={pageSize}
        getItemAriaLabel={__getItemAriaLabel}
        labelRowsPerPage={__labelRowsPerPage}
        labelDisplayedRows={__labelDisplayedRows}
      />
    );
  }, [
    __labelDisplayedRows,
    __getItemAriaLabel,
    __labelRowsPerPage,
    __pageIndex,
    pageSize,
    totalCount,
    handleChange,
    memoProps,
    memoStyle,
  ]);

  return pagination;
};
export default CommonTablePagination;
