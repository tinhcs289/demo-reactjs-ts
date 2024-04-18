import cloneDeep from 'lodash/cloneDeep';
const ID = '_id';
const PARENT_ID = '_parentId';
const CHILDRENS = '_childrens';
export default function toNestedDataArray<T>(
  flatArray: T[],
  options: {
    hasParentWhen: (item: T) => boolean;
    /**
     * @default '_id'
     */
    idField?: string;
    /**
     * @default '_parentId'
     */
    parentIdField?: string;
    /**
     * @default '_childrens'
     */
    childrensField?: string;
    /**
     * compare function for sorting childrens
     * @default undefined
     */
    sortFn?: (left: T, right: T) => number;
  }
) {
  const {
    idField: _id = ID,
    parentIdField: _parentId = PARENT_ID,
    childrensField: _childrens = CHILDRENS,
    sortFn,
    hasParentWhen,
  } = options || {};
  const list = cloneDeep(flatArray);

  list.forEach((item, _, rest) => {
    const childs = rest.filter((other) => (other as any)[_parentId] === (item as any)[_id]);
    if (!!sortFn) childs.sort(sortFn);
    (item as any)[_childrens] = childs;
  });
  const tree = list.filter((item) => !hasParentWhen(item));
  if (!!sortFn) tree.sort(sortFn);
  return tree;
}
