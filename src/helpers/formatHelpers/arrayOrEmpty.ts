import cloneDeep from 'lodash/cloneDeep';

const arrayOrEmpty = <T>(arr?: Array<T> | null) => {
  return arr instanceof Array && arr.length > 0 ? cloneDeep(arr) : [];
};
export default arrayOrEmpty;
