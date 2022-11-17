export interface IDashboardLayoutContextValues {
  layoutState: {
    isAsideOpen: boolean;
  };
  layoutAction: {
    toggleAside: (open?: boolean) => void;
  };
}
