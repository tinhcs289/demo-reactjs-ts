import DashboardLayoutProvider from '@/providers/DashboardLayoutProvider';
import { Outlet } from 'react-router-dom';
import { AutoToggleAsideByScreen } from './AsideMenu';
import Dashboard from './Dashboard';
import LayoutInit from './LayoutInit';
export default function DashboardLayout() {
  return (
    <DashboardLayoutProvider>
      <Dashboard>
        <Outlet />
      </Dashboard>
      <LayoutInit />
      <AutoToggleAsideByScreen />
    </DashboardLayoutProvider>
  );
}
