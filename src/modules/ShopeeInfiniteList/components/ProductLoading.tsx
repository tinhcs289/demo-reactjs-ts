import consecutiveNumbers from '@/helpers/arrayHelpers/consecutiveNumbers';
import { PAGE_SIZE } from '@/modules/ShopeeInfiniteList/constants';
import ProductItemSekeleton from './ProductItemSekeleton';

export default function ProductLoading() {
  return (
    <>
      {consecutiveNumbers(PAGE_SIZE).map((i) => (
        <ProductItemSekeleton key={i} />
      ))}
    </>
  );
}
