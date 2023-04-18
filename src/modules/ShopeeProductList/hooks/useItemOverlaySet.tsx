import type { ShopeeProductItem } from '@/types/Shopee';
import { useMemo } from 'react';
import ProductItemOverlayImage from '../components/ProductItemOverlayImage';
import { useItemElementSetStore } from '../context';
export default function useItemOverlaySet(product: ShopeeProductItem) {
  const [imageOverlays] = useItemElementSetStore((s) => s?.imageOverlays);
  const elementSet = useMemo(() => {
    if (!imageOverlays) return null;
    if (!product?.label_ids) return null;
    return imageOverlays.find(
      (elSet) => product?.label_ids?.includes?.(elSet?.product_label_ids?.[0] as any) || false
    );
  }, [imageOverlays, product?.label_ids]);
  const $overlayImage = useMemo(() => {
    if (!elementSet) return null;
    return <ProductItemOverlayImage image={elementSet.displayed_image} />;
  }, [elementSet]);
  return { overlaySet: elementSet, $overlayImage };
}
