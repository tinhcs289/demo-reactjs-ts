import { ID } from '../constants';
import { AsyncListProvider, ItemElementSetsProvider } from '../context';
import getList from '../services/getList';
import ProductList from './ProductList';
import ProductListPaging from './ProductListPaging';
export default function List() {
  return (
    <ItemElementSetsProvider>
      <AsyncListProvider onQuery={getList} queryOnFirstLoad idField={ID}>
        <ProductListPaging />
        <ProductList />
        <ProductListPaging />
      </AsyncListProvider>
    </ItemElementSetsProvider>
  );
}
