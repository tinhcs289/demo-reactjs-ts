import type { FC, ReactNode } from 'react';
import { createContext, useContext } from 'react';
import useAsideControl from './useAsideControl';
import type { IDashboardLayoutContextValues } from './_types';

const DashboardLayoutContext = createContext({} as IDashboardLayoutContextValues);

export const useDashboardLayoutContext = () => {
  return useContext(DashboardLayoutContext);
};

const DashboardLayoutProvider: FC<{ children?: ReactNode }> = (props) => {
  const { children } = props;

  const {
    //#region open/hide
    isAsideOpen,
    toggleAside,
    //#endregion
    //#region pageTitle
    getPageTitle,
    //#endregion
    //#region menu items
    menuItems,
    //#endregion
    //#region toggle sub menu
    urlOfInteractMenuItem,
    setInteractMenuItem,
    //#endregion
  } = useAsideControl();

  return (
    <DashboardLayoutContext.Provider
      value={
        {
          layoutState: {
            menuItems,
            isAsideOpen,
            urlOfInteractMenuItem,
            getPageTitle,
          },
          layoutAction: {
            toggleAside,
            setInteractMenuItem,
          },
        } as IDashboardLayoutContextValues
      }
    >
      {children}
    </DashboardLayoutContext.Provider>
  );
};
export default DashboardLayoutProvider;
