import getListBookingSell from '@/api/booking/getListBookingSell';
import type { TBookingSellListItem } from '@/api/booking/_types';
import type { TOnQueryArgs, TOnQueryRetuns } from '@/hooks/useListState/_types';

const getList = async (args: TOnQueryArgs): Promise<TOnQueryRetuns<TBookingSellListItem>> => {
  try {
    const res = await getListBookingSell({
      pageIndex: args?.pagination?.pageIndex || 1,
      pageSize: args?.pagination?.pageSize || 10,
    });
    if (
      !(
        res.status === 200 &&
        Array.isArray(res.data.result) &&
        res.data.result.length > 0 &&
        typeof res.data.totalCount === 'number' &&
        !Number.isNaN(res.data.totalCount) &&
        res.data.totalCount > 0
      )
    ) {
      throw res;
    }

    return {
      result: res.data.result,
      totalCount: res.data.totalCount,
    };
  } catch (error) {
    console.log(error);
    return {
      result: [],
      totalCount: 0,
    };
  }
};
export default getList;
