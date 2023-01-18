import tryCall from '@/api/tryCall';
import tryDo from '@/functions/tryDo';
import wait from '@/functions/wait';
import type { TShopeePromoBrandItem } from '../../_types';
import api from './api';

const getPromoBrands = async (): Promise<TShopeePromoBrandItem[]> => {
    const [data, error] = await tryCall(api).desireSuccessWith((response) =>
        !!response?.data &&
        Array.isArray(response.data?.shops) &&
        response.data.shops.length > 0
    );

    if (error) return [];

    await tryDo(wait, 500);

    return data.shops;
};
export default getPromoBrands;
