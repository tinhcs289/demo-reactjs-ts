import { GridContainer, GridContainerProps } from '@/components/grid';
import { useMediaQuery, useTheme } from '@mui/material';
import { useMemo } from 'react';
export function ListFilterContainer(props: GridContainerProps) {
  const { children, ...otherProps } = props;
  const theme = useTheme();
  const isMediumScreenOrLarger = useMediaQuery(theme.breakpoints.up('md'));
  const rootProps: Partial<GridContainerProps> = useMemo(() => {
    if (isMediumScreenOrLarger) return { flex: 1 };
    return { width: '100%' };
  }, [isMediumScreenOrLarger]);
  return (
    <GridContainer item {...otherProps} {...rootProps}>
      {children}
    </GridContainer>
  );
}
