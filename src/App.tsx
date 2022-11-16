import DateTimeProvider from '@/providers/DateTimeProvider';
import MUIThemeV5Provider from '@/providers/MUIThemeV5Provider';
import LanguageProvider from '@/providers/LanguageProvider';
import AppRoutes from '@/routes/AppRoutes';
import React from 'react';

const App: React.FC<any> = (props) => {
  return (
    <DateTimeProvider>
      <LanguageProvider>
        <MUIThemeV5Provider>
          <AppRoutes />
        </MUIThemeV5Provider>
      </LanguageProvider>
    </DateTimeProvider>
  );
};
export default App;
