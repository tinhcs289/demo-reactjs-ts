import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
const ID = '_id';
const PARENT_ID = '_parentId';
const CHILDRENS = '_childrens';
type AnyObject = { [x: string]: any };
export type FlattenOrNestedData<T extends AnyObject = AnyObject> = AnyObject &
  T & {
    [ID]?: string | number;
    [PARENT_ID]?: string | number;
    [CHILDRENS]?: FlattenOrNestedData<T>[];
  };
/**
 * Turn nested array into flatten array
 */
export function toFlattenDataArray<T extends AnyObject = AnyObject>(
  /**
   * orginal array with flat structure
   */
  nestedList: FlattenOrNestedData<T>[],
  options?: {
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
     * keep chilrens property of each item
     * @default false
     */
    keepChildrens?: boolean;
  }
): FlattenOrNestedData<T>[] {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    idField: _id = ID,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parentIdField: _parentId = PARENT_ID,
    childrensField: _childrens = CHILDRENS,
    keepChildrens = false,
  } = options || {};
  const arr = cloneDeep(nestedList);
  const flatten = (list: FlattenOrNestedData<T>[]) => {
    const newList = list.reduce((flattenList, item) => {
      if (item?.[_childrens] instanceof Array && item[_childrens].length > 0) {
        const itemChildrens = flatten(item[_childrens] as FlattenOrNestedData<T>[]);
        if (!!keepChildrens) {
          flattenList.push(item);
        } else {
          const itemWithoutChildrens = omit(item, _childrens) as FlattenOrNestedData<T>;
          flattenList.push(itemWithoutChildrens);
        }
        flattenList = flattenList.concat(itemChildrens);
      }
      return flattenList;
    }, [] as FlattenOrNestedData<T>[]);
    return newList;
  };
  const result = flatten(arr);
  return result;
}
