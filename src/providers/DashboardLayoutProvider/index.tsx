import useToggle from '@/hooks/useToggle';
import React, { createContext, useContext } from 'react';
import type { IDashboardLayoutContextValues } from './_types';

const DashboardLayoutContext = createContext({} as IDashboardLayoutContextValues);

export const useDashboardLayoutContext = () => {
  return useContext(DashboardLayoutContext);
};

const DashboardLayoutProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
  const { children } = props;
  const [isAsideOpen, toggleAside] = useToggle(true);

  return (
    <DashboardLayoutContext.Provider
      value={
        {
          layoutState: {
            isAsideOpen,
          },
          layoutAction: {
            toggleAside,
          },
        } as IDashboardLayoutContextValues
      }
    >
      {children}
    </DashboardLayoutContext.Provider>
  );
};
export default DashboardLayoutProvider;
