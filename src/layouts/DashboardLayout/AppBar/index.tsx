import ButtonLanguage from '@/layouts/DashboardLayout/AppBar/ButtonLanguage';
import { APP_BAR_HEIGHT, ASIDE_MENU_WIDTH } from '@/layouts/DashboardLayout/constants';
import { useDashboardLayoutState } from '@/providers/DashboardLayoutProvider';
import type { AppBarProps } from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import { memo, useMemo } from 'react';
import ButtonLogout from './ButtonLogout';
import ButtonMenu from './ButtonMenu';
import PageTitle from './PageTitle';
const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps & { open?: boolean }>(({ theme, open }) => ({
  height: `${APP_BAR_HEIGHT}px !important`,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: ASIDE_MENU_WIDTH,
    width: `calc(100% - ${ASIDE_MENU_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const ToolbarStyled = styled(Toolbar)<ToolbarProps>(({ theme }) => ({
  height: `${APP_BAR_HEIGHT}px !important`,
  minHeight: `${APP_BAR_HEIGHT}px !important`,
  paddingRight: `${theme.spacing(1)} !important`,
  paddingLeft: `${theme.spacing(1)} !important`,
}));
function AppBar() {
  const isAsideOpen = useDashboardLayoutState((s) => s.isAsideOpen);
  const memoOpen = useMemo(() => !!isAsideOpen, [isAsideOpen]);
  const $ButtonMenu = useMemo(() => <ButtonMenu />, []);
  const $PageTitle = useMemo(() => <PageTitle />, []);
  const $ButtonLanguage = useMemo(() => <ButtonLanguage />, []);
  const $ButtonLogout = useMemo(() => <ButtonLogout />, []);
  return (
    <AppBarStyled position="absolute" open={memoOpen}>
      <ToolbarStyled>
        {$ButtonMenu}
        {$PageTitle}
        {$ButtonLanguage}
        {$ButtonLogout}
      </ToolbarStyled>
    </AppBarStyled>
  );
}
export default memo(AppBar);
