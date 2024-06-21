import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
const DateTimeProvider = lazy(() => wait().then(() => import('@/providers/DateTimeProvider')));
const ExceptionHandlingProvider = lazy(() =>
  wait().then(() => import('@/providers/ExceptionHandlingProvider'))
);
const LanguageProvider = lazy(() => wait().then(() => import('@/providers/LanguageProvider')));
const MUIThemeV5Provider = lazy(() => wait().then(() => import('@/providers/MUIThemeV5Provider')));
const NotiStackProvider = lazy(() => wait().then(() => import('@/providers/NotiStackProvider')));
const ReactQueryProvider = lazy(() => wait().then(() => import('@/providers/ReactQueryProvider')));
const ReduxProvider = lazy(() => wait().then(() => import('@/providers/ReduxProvider')));
const AppRouter = lazy(() => wait().then(() => import('./AppRouter')));
const SessonTimeoutWarning = lazy(() => wait().then(() => import('@/modules/SessonTimeoutWarning')));
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
                  <SessonTimeoutWarning />
                </NotiStackProvider>
              </MUIThemeV5Provider>
            </ReactQueryProvider>
          </ReduxProvider>
        </LanguageProvider>
      </DateTimeProvider>
    </ExceptionHandlingProvider>
  );
}
