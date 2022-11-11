import DashboardLayout from '@/layouts/DashboardLayout';
import DateTimeProvider from '@/providers/DateTimeProvider';
import MUIThemeV5Provider from '@/providers/MUIThemeV5Provider';
import DashboardLayoutProvider from '@/providers/DashboardLayoutProvider';
import React from 'react';

const App: React.FC<any> = (props) => {
  return (
    <DateTimeProvider>
      <MUIThemeV5Provider>
        <DashboardLayoutProvider>
          <DashboardLayout />
        </DashboardLayoutProvider>
      </MUIThemeV5Provider>
    </DateTimeProvider>
  );
};
export default App;
