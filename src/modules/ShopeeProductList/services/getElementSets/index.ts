import callHttp from '@/functions/callHttp';
import tryDo from '@/functions/tryDo';
import wait from '@/functions/wait';
import type { ShopeeElementSet } from '@/types/Shopee';
import api from './api';
const defaultReturns: ShopeeElementSet = {
  image_flag: [],
  overlay_image: [],
  promotion_label: [],
};
function isValidData(r: any) {
  return !!r?.data &&
    Array.isArray(r.data.image_flag) &&
    r.data.image_flag.length > 0 &&
    Array.isArray(r.data.overlay_image) &&
    r.data.overlay_image.length > 0 &&
    Array.isArray(r.data.promotion_label) &&
    r.data.promotion_label.length > 0;
}
export default async function getElementSets(): Promise<ShopeeElementSet> {
  const [error, data] = await callHttp(api).waitFor(isValidData);
  if (error) return defaultReturns;
  await tryDo(wait, 500);
  return data;
};
