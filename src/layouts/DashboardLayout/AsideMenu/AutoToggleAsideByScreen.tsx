import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import type { Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useCallback, useEffect } from 'react';

export default function AutoToggleAsideByScreen() {
  const [isAsideOpen, setIsAsideOpen] = useDashboardLayout((s) => s.isAsideOpen);

  const toggleAside = useCallback(() => {
    setIsAsideOpen({ isAsideOpen: !isAsideOpen });
  }, [setIsAsideOpen, isAsideOpen]);

  const isMediumScreenOrLower = useMediaQuery((t: Theme) => t?.breakpoints?.down?.('lg'));

  useEffect(() => {
    if ((isMediumScreenOrLower && isAsideOpen) || (!isMediumScreenOrLower && !isAsideOpen)) {
      toggleAside();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMediumScreenOrLower]);

  return <></>;
}
