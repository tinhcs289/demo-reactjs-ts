import type { ReactNode } from 'react';

export interface IDashboardLayoutContextValues {
  layoutState: {
    isAsideOpen: boolean;
    urlOfInteractMenuItem: string | null;
    isMatchPath: (url?: string, isExact?: boolean) => boolean;
    menuItems: TAsideMenuItem[];
    getPageTitle: () => ReactNode | null;
  };
  layoutAction: {
    toggleAside: (open?: boolean) => void;
    setInteractMenuItem: (url?: string) => void;
  };
}
