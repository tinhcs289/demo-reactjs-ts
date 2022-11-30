import type { ReactNode } from 'react';

export interface IDashboardLayoutContextValues {
  layoutState: {
    isAsideOpen: boolean;
    urlOfInteractMenuItem: string | null;
    menuItems: TAsideMenuItem[];
    getPageTitle: () => ReactNode | null;
  };
  layoutAction: {
    toggleAside: (open?: boolean) => void;
    setInteractMenuItem: (url?: string) => void;
  };
}
