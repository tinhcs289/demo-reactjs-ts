import consecutiveNumbers from '@/helpers/arrayHelpers/consecutiveNumbers';
import { PAGE_SIZE } from '../constants';
import ProductItemSekeleton from './ProductItemSekeleton';
export default function ProductListLoading() {
  return (
    <>
      {consecutiveNumbers(PAGE_SIZE).map((i) => (
        <ProductItemSekeleton key={i} />
      ))}
    </>
  );
}
