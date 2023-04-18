import createAsyncListContext from '@/functions/createAsyncListContext';
import createFastContext from '@/functions/createFastContext';
import type {
  ShopeeProductItem,
  ShopeeProductItemImageFlag,
  ShopeeProductItemImageOverlay,
  ShopeeProductItemPromotionLabel,
} from '@/types/Shopee';
import { ReactNode, useEffect } from 'react';
import getElementSets from './services/getElementSets';
import { PAGE_SIZE } from '@/modules/ShopeeProductList/constants';
//#region List context
const context = createAsyncListContext<ShopeeProductItem>({ pageSize: PAGE_SIZE });
export const { AsyncListProvider, useAsyncListGetter, useAsyncListSetter, useAsyncListAction } = context;
//#endregion
//#region Element Sets context
export type ItemElementSetsContextValue = {
  promoLabels: ShopeeProductItemPromotionLabel[];
  imageFlags: ShopeeProductItemImageFlag[];
  imageOverlays: ShopeeProductItemImageOverlay[];
};
const {
  Provider,
  useStore: useItemElementSetStore,
  useSetter,
} = createFastContext<ItemElementSetsContextValue>({} as any);
function Init() {
  const set = useSetter();
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
function ItemElementSetsProvider(props?: { children?: ReactNode }) {
  return (
    <Provider>
      <Init />
      {props?.children}
    </Provider>
  );
}
export { useItemElementSetStore, ItemElementSetsProvider };
//#endregion
