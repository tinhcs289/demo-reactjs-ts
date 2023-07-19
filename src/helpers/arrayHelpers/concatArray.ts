/**
 * @example const allUsers = concatArray(listUser1, listUser2, listUser3, listUser4)
 */
const concatArray = <T>(...arrs: T[][]) => {
  let result = [] as T[];
  arrs.forEach((a) => {
    result = result.concat(a);
  });

  return result;
};
export default concatArray;
