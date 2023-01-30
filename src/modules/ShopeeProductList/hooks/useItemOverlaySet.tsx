import { useItemElementSetStore } from '@/pages/ShopeePage/context/ItemElementSetsProvider';
import { useMemo } from 'react';
import ProductItemOverlayImage from '../components/ProductItemOverlayImage';
import type { TShopeeProductItem } from '../_types';

export default function useItemOverlaySet(product: TShopeeProductItem) {
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
