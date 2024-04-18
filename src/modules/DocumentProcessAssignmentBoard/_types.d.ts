import type { AnyObject } from '@/types';
import type { OfficerInfo } from './api';
export type DndItemData<DataType extends AnyObject = AnyObject> = DataType & {
  /**
   * IMPORTANT: unique string identifier value.
   */
  _id: string;
};
export type DndBoardColumnData<
  ItemDataType extends AnyObject = AnyObject,
  ColumnDataType extends AnyObject = AnyObject,
> = {
  /**
   * IMPORTANT: unique string identifier value.
   */
  _id: string;
  /**
   * List of items of each column
   */
  items: Array<DndItemData<ItemDataType>>;
  /**
   * extended data go here
   */
  data?: ColumnDataType;
};
type NestedOfficersInfo = OfficerInfo & {
  _childrens?: NestedOfficersInfo[];
};
