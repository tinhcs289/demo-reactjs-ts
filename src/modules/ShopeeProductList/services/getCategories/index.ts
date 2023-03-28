import tryCall from '@/functions/tryCall';
import tryDo from '@/functions/tryDo';
import wait from '@/functions/wait';
import type { TShopeeCategoryItem } from '../../_types';
import api from './api';

const getCategories = async (): Promise<TShopeeCategoryItem[]> => {
  const [data, error] = await tryCall(api).desireSuccessWith(
    (response) =>
      !!response?.data && Array.isArray(response.data.category_list) && response.data.category_list.length > 0
  );

  if (error) return [];

  await tryDo(wait, 500);

  return data.category_list;
};
export default getCategories;
