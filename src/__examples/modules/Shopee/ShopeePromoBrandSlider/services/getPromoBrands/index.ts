import callHttp from '@/helpers/asyncHelpers/callHttp';
import tryDo from '@/helpers/asyncHelpers/tryDo';
import wait from '@/helpers/asyncHelpers/wait';
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
}
