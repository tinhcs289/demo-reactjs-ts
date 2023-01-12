import ProductList from './components/ProductList';
import ProductPaging from './components/ProductPaging';
import { PAGE_SIZE } from './constants';
import { AsyncListProvider } from './context';
import getList from './services/getList';

export default function ShopeeInfiniteList() {
  return (
    <AsyncListProvider onQuery={getList} queryOnFirstLoad idField="itemid" defaultPagination={{ pageSize: PAGE_SIZE }}>
      <ProductPaging />
      <ProductList />
      <ProductPaging />
    </AsyncListProvider>
  );
}
