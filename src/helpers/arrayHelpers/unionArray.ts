import uniqBy from 'lodash/uniqBy';
export default function mergeArrays<T>(arrays: T[][], comparer?: (i: T) => any) {
  if (!arrays || !(arrays instanceof Array && arrays.length > 0)) return [];
  let result = [] as T[];
  arrays.forEach((a) => {
    result = result.concat(a);
  });
  let cmp = comparer || ((i: T) => i);
  result = uniqBy(result, cmp);
  return result;
}
