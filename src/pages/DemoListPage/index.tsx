import ShopeeProductList from '@/modules/ShopeeProductList';
import ItemElementSetsProvider from '@/pages/ShopeePage/context/ItemElementSetsProvider';

export default function DemoListPage() {
  return (
    <ItemElementSetsProvider>
      <ShopeeProductList />
    </ItemElementSetsProvider>
  );
}
