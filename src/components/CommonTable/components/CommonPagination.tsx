import Pagination from '@mui/material/Pagination';
import type { ChangeEvent, FC, Ref } from 'react';
import { forwardRef, memo, useCallback, useMemo } from 'react';
import type { ICommonPaginationProps } from '../_types';

const CommonPagination = forwardRef((props: ICommonPaginationProps, ref?: Ref<unknown>) => {
  const { pageIndex, pageSize, totalCount, onChange, sx, ...otherProps } = props;

  const memoStyle = useMemo(() => {
    return { display: 'flex', justifyContent: 'center', ...sx };
  }, [sx]);

  const memoProps = useMemo(() => {
    return otherProps;
  }, [otherProps]);

  const totalPages = useMemo(() => {
    return Math.ceil((totalCount || 0) / (pageSize || 10));
  }, [totalCount, pageSize]);

  const handleChange = useCallback(
    (event: ChangeEvent<unknown>, page: number) => {
      event?.stopPropagation?.();
      event?.preventDefault?.();
      onChange?.(page);
    },
    [onChange],
  );

  const pagination = useMemo(() => {
    return (
      <Pagination
        ref={ref}
        showFirstButton
        showLastButton
        color="primary"
        {...memoProps}
        sx={memoStyle}
        onChange={handleChange}
        count={totalPages}
        page={pageIndex}
      />
    );
  }, [pageIndex, totalPages, handleChange, memoProps, memoStyle, ref]);

  return pagination;
});
export default memo(CommonPagination) as FC<ICommonPaginationProps>;
