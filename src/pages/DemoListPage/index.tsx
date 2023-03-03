import DashboardTabsContainer from '@/containers/DashboardTabsContainer';
import ShopeeProductList from '@/modules/ShopeeProductList';
import ItemElementSetsProvider from '@/pages/ShopeePage/context/ItemElementSetsProvider';

export default function DemoListPage() {
  return (
    <DashboardTabsContainer>
      <ItemElementSetsProvider>
        <ShopeeProductList />
      </ItemElementSetsProvider>
    </DashboardTabsContainer>
  );
}
