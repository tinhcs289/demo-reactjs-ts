import { useDashboardLayoutState } from '@/providers/DashboardLayoutProvider';
import { styled } from '@mui/material';
import type { ContainerProps } from '@mui/material/Container';
import Container from '@mui/material/Container';
import { useMemo } from 'react';
import { DEFAULT_WIDTH, MODIFIABLE_WIDTH } from './constants';
const ContainerStyled = styled(Container)<ContainerProps>(({ theme }) => ({
  padding: `0 !important`,
  marginBottom: theme.spacing(2),
  height: `calc(100% - ${theme.spacing(8 + 4)})`, // 8 = height of Appbar, 4 = 2 * my(2)
  [theme.breakpoints.up('sm')]: {
    padding: `${theme.spacing(2, 2, 2, 2)} !important`,
  },
}));
export default function DashboardPageContainer(props: ContainerProps) {
  const { children, ...otherProps } = props;
  const pageMaxWidth = useDashboardLayoutState((s) => s.pageMaxWidth);
  const maxWidth = useMemo(() => (!MODIFIABLE_WIDTH ? 'sx' : pageMaxWidth || DEFAULT_WIDTH), [pageMaxWidth]);
  return (
    <ContainerStyled {...otherProps} sx={{ height: '100%', ...otherProps?.sx }} maxWidth={maxWidth as any}>
      {children}
    </ContainerStyled>
  );
}
