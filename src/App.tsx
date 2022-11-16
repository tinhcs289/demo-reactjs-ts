import DateTimeProvider from '@/providers/DateTimeProvider';
import LanguageProvider from '@/providers/LanguageProvider';
import MUIThemeV5Provider from '@/providers/MUIThemeV5Provider';
import NotiStackProvider from '@/providers/NotiStackProvider';
import ReduxProvider from '@/providers/ReduxProvider';
import AppRoutes from '@/routes/AppRoutes';
import React from 'react';

const App: React.FC<any> = (props) => {
  return (
    <DateTimeProvider>
      <LanguageProvider>
        <ReduxProvider>
          <MUIThemeV5Provider>
            <NotiStackProvider>
              <AppRoutes />
            </NotiStackProvider>
          </MUIThemeV5Provider>
        </ReduxProvider>
      </LanguageProvider>
    </DateTimeProvider>
  );
};
export default App;
