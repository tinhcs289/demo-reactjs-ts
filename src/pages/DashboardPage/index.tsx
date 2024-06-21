import wait from '@/helpers/asyncHelpers/wait';
import { DashboardPageContainer } from '@/layouts/DashboardLayout';
import { lazy } from 'react';
// const PDFViewDemo = lazy(() => wait().then(() => import('./PDFViewDemo')));
// const BoardDemo = lazy(() => wait().then(() => import('./BoardDemo')));
const TurnableViewDemo = lazy(() => wait().then(() => import('./TurnableViewDemo')));
export default function DashboardPage() {
  return (
    <DashboardPageContainer>
      {/* <PDFViewDemo /> */}
      {/* <BoardDemo /> */}
      <TurnableViewDemo />
    </DashboardPageContainer>
  );
}
