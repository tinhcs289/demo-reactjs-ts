import Pagination from '@mui/material/Pagination';
import type { ChangeEvent, FC } from 'react';
import { useCallback, useMemo } from 'react';
import type { ICommonPaginationProps } from '../_types';

const CommonPagination: FC<ICommonPaginationProps> = (props) => {
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
  }, [pageIndex, totalPages, handleChange, memoProps, memoStyle]);

  return pagination;
};
export default CommonPagination;
