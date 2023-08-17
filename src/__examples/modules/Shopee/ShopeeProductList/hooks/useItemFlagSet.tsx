import type { ShopeeProductItem } from '@/types/Shopee';
import { useMemo } from 'react';
import ProductItemOverlayImage from '../components/ProductItemOverlayImage';
import { useItemElementSetStore } from '../context';
export default function useItemFlagSet(product: ShopeeProductItem) {
  const [imageFlags] = useItemElementSetStore((s) => s?.imageFlags);
  const elementSet = useMemo(() => {
    if (!imageFlags) return null;
    if (!product?.label_ids) return null;
    return imageFlags.find((elSet) => product?.label_ids?.includes?.(elSet?.id) || false);
  }, [imageFlags, product?.label_ids]);
  const $imageFlagSet = useMemo(() => {
    if (!elementSet?.displayed_image) return null;
    return <ProductItemOverlayImage image={elementSet.displayed_image} />;
  }, [elementSet?.displayed_image]);
  return { flagSet: elementSet, $imageFlagSet };
}
