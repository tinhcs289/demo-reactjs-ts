import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useCallback, useMemo } from 'react';
export default function AsideToggleButton() {
  const [isAsideOpen, setIsAsideOpen] = useDashboardLayout((s) => s.isAsideOpen);
  const toggleAside = useCallback(() => {
    setIsAsideOpen({ isAsideOpen: !isAsideOpen });
  }, [setIsAsideOpen, isAsideOpen]);
  const $Button = useMemo(() => {
    if (isAsideOpen) return null;
    return (
      <Tooltip title="Mở rộng">
        <IconButton onClick={toggleAside}>
          <MenuIcon />
        </IconButton>
      </Tooltip>
    );
  }, [isAsideOpen, toggleAside]);
  return $Button;
}
