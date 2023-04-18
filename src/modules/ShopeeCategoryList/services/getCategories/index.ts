import callHttp from '@/functions/callHttp';
import tryDo from '@/functions/tryDo';
import wait from '@/functions/wait';
import { ShopeeCategoryItem } from '@/types/Shopee';
import api from './api';
function isValidData(r: any) {
  return !!r?.data && Array.isArray(r.data.category_list) && r.data.category_list.length > 0
}
export default async function getCategories(): Promise<ShopeeCategoryItem[]> {
  const [error, data] = await callHttp(api).waitFor(isValidData);
  if (error) return [];
  await tryDo(wait(500));
  return data.category_list;
};
