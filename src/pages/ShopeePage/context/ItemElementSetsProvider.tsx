import createFastContext from '@/functions/createFastContext';
import getElementSets from '@/modules/ShopeeProductList/services/getElementSets';
import type {
  TShopeeProductItemImageFlag,
  TShopeeProductItemImageOverlay,
  TShopeeProductItemPromotionLabel
} from '@/modules/ShopeeProductList/_types';
import { ReactNode, useEffect } from 'react';

export type ItemElementSetsContextValue = {
  promoLabels: TShopeeProductItemPromotionLabel[];
  imageFlags: TShopeeProductItemImageFlag[];
  imageOverlays: TShopeeProductItemImageOverlay[];
};

const { Provider, useStore: useItemElementSetStore } = createFastContext<ItemElementSetsContextValue>({} as any);

export { useItemElementSetStore };

function Init() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, set] = useItemElementSetStore((s) => s);

  useEffect(() => {
    getElementSets().then((data) => {
      set({
        imageFlags: data.image_flag,
        imageOverlays: data.overlay_image,
        promoLabels: data.promotion_label,
      });
    });
  }, [set]);

  return <></>;
}

export default function ItemElementSetsProvider(props?: { children?: ReactNode }) {
  return (
    <Provider>
      <Init />
      {props?.children}
    </Provider>
  );
}
