import { useDashboardLayoutState } from '@/providers/DashboardLayoutProvider';
import { styled } from '@mui/material';
import type { ContainerProps } from '@mui/material/Container';
import Container from '@mui/material/Container';
import { useMemo } from 'react';
import { DEFAULT_WIDTH, LAYOUT_PADDING, MODIFIABLE_WIDTH, PAGE_HEIGHT } from './constants';
const ContainerStyled = styled(Container)<ContainerProps>(({ theme }) => ({
  padding: `0 !important`,
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  height: PAGE_HEIGHT,
  [theme.breakpoints.up('sm')]: {
    padding: `${LAYOUT_PADDING}px !important`,
  },
}));
export default function DashboardPageContainer(props: ContainerProps) {
  const { children, ...otherProps } = props;
  const pageMaxWidth = useDashboardLayoutState((s) => s.pageMaxWidth);
  const maxWidth = useMemo(() => (!MODIFIABLE_WIDTH ? 'sx' : pageMaxWidth || DEFAULT_WIDTH), [pageMaxWidth]);
  return (
    <ContainerStyled {...otherProps} maxWidth={maxWidth as any}>
      {children}
    </ContainerStyled>
  );
}
