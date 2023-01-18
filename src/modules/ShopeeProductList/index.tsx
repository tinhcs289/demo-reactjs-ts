import ProductList from './components/ProductList';
import ProductListPaging from './components/ProductListPaging';
import { PAGE_SIZE } from './constants';
import { AsyncListProvider } from './context';
import getList from './services/getList';

export default function ShopeeProductList() {
  return (
    <AsyncListProvider onQuery={getList} queryOnFirstLoad idField="itemid" defaultPagination={{ pageSize: PAGE_SIZE }}>
      <ProductListPaging />
      <ProductList />
      <ProductListPaging />
    </AsyncListProvider>
  );
}
