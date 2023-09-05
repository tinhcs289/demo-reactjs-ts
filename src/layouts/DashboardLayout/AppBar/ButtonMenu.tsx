import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { styled } from '@mui/material';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useCallback, useMemo } from 'react';
const IconButtonStyled = styled(IconButton, { shouldForwardProp: (p) => p !== 'show' })<
  IconButtonProps & { show?: boolean }
>(({ theme }) => ({
  marginRight: theme.spacing(2),
  marginLeft: 0,
}));
export default function ButtonMenu() {
  const [isAsideOpen, toggleAside] = useDashboardLayout((s) => s.isAsideOpen);
  const memoOpen = useMemo(() => !!isAsideOpen, [isAsideOpen]);
  const toggle = useCallback(() => {
    toggleAside({ isAsideOpen: !isAsideOpen });
  }, [toggleAside, isAsideOpen]);
  const $Button = useMemo(() => {
    return (
      <Tooltip title="Thu gọn">
        <IconButtonStyled edge="start" color="inherit" onClick={toggle} show={memoOpen}>
          <MenuOpenIcon />
        </IconButtonStyled>
      </Tooltip>
    );
  }, [toggle, memoOpen]);
  return $Button;
}
