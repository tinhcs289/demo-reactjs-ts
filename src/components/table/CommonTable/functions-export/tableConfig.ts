import newGuid from '@/helpers/stringHelpers/newGuid';
import type { AnyObject } from '@/types';
import type { CommonTableConfig } from '../_types';
/**
 * create an array of configurations for table columns
 * @param headers
 * @returns
 */
export default function tableConfig<RowData extends AnyObject>(
  ...headers: Array<Omit<CommonTableConfig<RowData>, '_key'>>
): Array<CommonTableConfig<RowData>> {
  return headers.map((head) => ({ ...head, _key: newGuid() }));
}
