import type { Theme } from '@mui/material';
import { styled, useMediaQuery } from '@mui/material';
import type { PaginationProps } from '@mui/material/Pagination';
import Pagination from '@mui/material/Pagination';
import type { ChangeEvent, FC } from 'react';
import { useCallback, useMemo } from 'react';
import type { ICommonPaginationProps } from '../_types';

const PaginationStyled = styled(Pagination)<PaginationProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
}));

const CommonPagination: FC<ICommonPaginationProps> = (props) => {
  const { pageIndex, pageSize, totalCount, onChange, loading, ...otherProps } = props;

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

  const isSmallScreenOrLower = useMediaQuery((t: Theme) => t?.breakpoints?.down?.('sm'));

  const propsByScreen = useMemo(() => {
    if (!isSmallScreenOrLower)
      return {
        boundaryCount: 2,
        siblingCount: 3,
      };
    return {
      boundaryCount: 1,
      siblingCount: 0,
    };
  }, [isSmallScreenOrLower]);

  const pagination = useMemo(() => {
    return (
      <PaginationStyled
        showFirstButton
        showLastButton
        color="primary"
        {...memoProps}
        onChange={handleChange}
        count={totalPages}
        page={pageIndex}
        {...propsByScreen}
      />
    );
  }, [pageIndex, totalPages, handleChange, memoProps, propsByScreen]);

  return pagination;
};
export default CommonPagination;
