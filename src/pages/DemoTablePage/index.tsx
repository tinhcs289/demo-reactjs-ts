import DashboardTabsContainer from '@/containers/DashboardTabsContainer';
import OrderList from '@/modules/OrderList';

export default function DemoTablePage() {
  return (
    <DashboardTabsContainer>
      <OrderList />
    </DashboardTabsContainer>
  );
}
