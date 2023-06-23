import DateTimeProvider from '@/providers/DateTimeProvider';
import ExceptionHandlingProvider from '@/providers/ExceptionHandlingProvider';
import LanguageProvider from '@/providers/LanguageProvider';
import MUIThemeV5Provider from '@/providers/MUIThemeV5Provider';
import NotiStackProvider from '@/providers/NotiStackProvider';
import ReduxProvider from '@/providers/ReduxProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import AppRouter from './AppRouter';
export default function App() {
  return (
    <ExceptionHandlingProvider>
      <DateTimeProvider>
        <LanguageProvider>
          <ReduxProvider>
            <ReactQueryProvider>
              <MUIThemeV5Provider>
                <NotiStackProvider>
                  <AppRouter />
                </NotiStackProvider>
              </MUIThemeV5Provider>
            </ReactQueryProvider>
          </ReduxProvider>
        </LanguageProvider>
      </DateTimeProvider>
    </ExceptionHandlingProvider>
  );
}
