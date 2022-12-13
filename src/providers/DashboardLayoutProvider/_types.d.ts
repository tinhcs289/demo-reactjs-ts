import type { TAsideMenuItem } from '@/layouts/DashboardLayout/_types';
import type { ReactNode } from 'react';

export interface TLayoutContextValue {
  isAsideOpen: boolean;
  urlOfInteractMenuItem: string | null;
  menuItems: TAsideMenuItem[];
  pageTitle: ReactNode | null;
}
