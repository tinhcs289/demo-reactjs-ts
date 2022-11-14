import DateTimeProvider from '@/providers/DateTimeProvider';
import MUIThemeV5Provider from '@/providers/MUIThemeV5Provider';
import AppRoutes from '@/routes/AppRoutes';
import React from 'react';

const App: React.FC<any> = (props) => {
  return (
    <DateTimeProvider>
      <MUIThemeV5Provider>
        <AppRoutes />
      </MUIThemeV5Provider>
    </DateTimeProvider>
  );
};
export default App;
