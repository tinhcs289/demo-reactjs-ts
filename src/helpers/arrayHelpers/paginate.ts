import cloneDeep from 'lodash/cloneDeep';

/**
 * @example const pageOneData = paginate(data, 1, 10)
 */
const paginate = <T>(arr: T[] = [], page_number: number = 1, page_size: number = 10) => {
  if (
    !(
      arr instanceof Array &&
      arr.length > 0 &&
      typeof page_size === 'number' &&
      !Number.isNaN(page_size) &&
      page_size > 0 &&
      typeof page_number === 'number' &&
      !Number.isNaN(page_number) &&
      page_number > 0
    )
  )
    return [];

  const source = cloneDeep(arr);
  return source.slice((page_number - 1) * page_size, page_number * page_size);
};
export default paginate;
