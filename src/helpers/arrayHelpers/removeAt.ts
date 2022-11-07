import cloneDeep from 'lodash/cloneDeep';


const removeAt = <T>(arr: T[] = [], index: number = 0) => {
  let cloneArray = cloneDeep(arr);
  let updateArray = cloneArray.slice(0, index);
  updateArray = updateArray.concat(cloneArray.slice(index + 1, cloneArray.length));
  return updateArray;
};
export default removeAt;
