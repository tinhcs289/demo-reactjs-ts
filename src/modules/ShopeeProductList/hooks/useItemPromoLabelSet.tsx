import type { ShopeeProductItem } from '@/types/Shopee';
import { useMemo } from 'react';
import { LabelPromo } from '../components/LabelText';
import { useItemElementSetStore } from '../context';
export default function useItemPromoLabelSet(product: ShopeeProductItem) {
  const [promoLabels] = useItemElementSetStore((s) => s?.promoLabels);
  const elementSet = useMemo(() => {
    if (!promoLabels) return null;
    if (!product?.label_ids) return null;
    return promoLabels.filter(
      (elSet) => product?.label_ids?.includes?.(elSet?.product_label_ids?.[0] as any) || false
    );
  }, [promoLabels, product?.label_ids]);
  const $promoLabelSet = useMemo(() => {
    if (!elementSet || !Array.isArray(elementSet)) return null;
    return elementSet.map((s) => <LabelPromo key={s.id}>{s?.displayed_texts?.[0]?.text || ''}</LabelPromo>);
  }, [elementSet]);
  return { promoLabelSet: elementSet, $promoLabelSet };
}
