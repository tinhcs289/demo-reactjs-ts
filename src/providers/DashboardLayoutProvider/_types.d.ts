import type { TAsideMenuItem } from '@/layouts/DashboardLayout';
import { Breakpoint } from '@mui/material';
import type { ReactNode } from 'react';

export interface LayoutContextValues {
  isAsideOpen: boolean;
  urlOfInteractMenuItem: string | null;
  menuItems: TAsideMenuItem[];
  pageTitle: ReactNode | null;
  pageMaxWidth?: Breakpoint;
}
