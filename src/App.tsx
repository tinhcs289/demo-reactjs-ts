import DateTimeProvider from '@/providers/DateTimeProvider';
import LanguageProvider from '@/providers/LanguageProvider';
import MUIThemeV5Provider from '@/providers/MUIThemeV5Provider';
import NotiStackProvider from '@/providers/NotiStackProvider';
import ReduxProvider from '@/providers/ReduxProvider';
import React from 'react';
import './App.css';
import AppRouter from './AppRouter';

const App: React.FC<any> = (props) => {
  return (
    <DateTimeProvider>
      <LanguageProvider>
        <ReduxProvider>
          <MUIThemeV5Provider>
            <NotiStackProvider>
              <AppRouter />
            </NotiStackProvider>
          </MUIThemeV5Provider>
        </ReduxProvider>
      </LanguageProvider>
    </DateTimeProvider>
  );
};
export default App;
