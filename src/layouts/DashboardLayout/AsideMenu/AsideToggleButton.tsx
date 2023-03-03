import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import { useCallback } from 'react';

export default function AsideToggleButton() {
  const [isAsideOpen, setIsAsideOpen] = useDashboardLayout((s) => s.isAsideOpen);
  const toggleAside = useCallback(() => {
    setIsAsideOpen({ isAsideOpen: !isAsideOpen });
  }, [setIsAsideOpen, isAsideOpen]);
  return (
    <IconButton onClick={toggleAside}>
      <ChevronLeftIcon />
    </IconButton>
  );
}
