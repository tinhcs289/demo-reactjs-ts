import tryCall from '@/api/tryCall';
import tryDo from '@/functions/tryDo';
import wait from '@/functions/wait';
import type { TShopeeElementSet } from '../../_types';
import api from './api';

const getElementSets = async (): Promise<TShopeeElementSet> => {
  const [data, error] = await tryCall(api).desireSuccessWith(
    (response) =>
      !!response?.data &&
      Array.isArray(response.data.image_flag) &&
      response.data.image_flag.length > 0 &&
      Array.isArray(response.data.overlay_image) &&
      response.data.overlay_image.length > 0 &&
      Array.isArray(response.data.promotion_label) &&
      response.data.promotion_label.length > 0
  );

  if (error)
    return {
      image_flag: [],
      overlay_image: [],
      promotion_label: [],
    };

  await tryDo(wait, 500);

  return data;
};
export default getElementSets;
