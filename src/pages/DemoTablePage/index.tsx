import wait from '@/functions/wait';
import { lazy } from 'react';
const DashboardTabsContainer = lazy(() => wait(0).then(() => import('@/containers/DashboardTabsContainer')));
const TableOrders = lazy(() => wait(0).then(() => import('@/modules/TableOrders')));
export default function DemoTablePage() {
  return (
    <DashboardTabsContainer>
      <TableOrders />
    </DashboardTabsContainer>
  );
}
