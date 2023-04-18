import callHttp from '@/functions/callHttp';
import tryDo from '@/functions/tryDo';
import wait from '@/functions/wait';
import type { ShopeePromoBrandItem } from '@/types/Shopee';
import api from './api';
function isValidData(response: any) {
  return !!response?.data && Array.isArray(response.data?.shops) && response.data.shops.length > 0;
}
export default async function getPromoBrands(): Promise<ShopeePromoBrandItem[]> {
  const [error, data] = await callHttp(api).waitFor(isValidData);
  if (error) return [];
  await tryDo(wait(500));
  return data.shops;
};
