import type { AnyObject } from '@/types';
import cloneDeep from 'lodash/cloneDeep';
import type { DraggableLocation } from 'react-beautiful-dnd';
import type { DndBoardColumnData } from './_types';
export function reorder<ItemDataType extends any = any>(
  list: ItemDataType[],
  startIndex: number,
  endIndex: number
) {
  if (!(list instanceof Array && list.length > 0)) return [];
  if (!Number.isInteger(startIndex)) return [];
  if (!Number.isInteger(endIndex)) return [];
  const result = cloneDeep(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}
export function reorderItemsBetweenColumns<
  ItemDataType extends AnyObject = AnyObject,
  ColumnDataType extends AnyObject = AnyObject,
>({
  data,
  source,
  destination,
}: {
  data: DndBoardColumnData<ItemDataType, ColumnDataType>[];
  source: DraggableLocation;
  destination: DraggableLocation;
}): DndBoardColumnData<ItemDataType, ColumnDataType>[] {
  if (!(data instanceof Array && data.length > 0)) return [];
  if (!source || !source?.droppableId) return [];
  if (!destination || !destination?.droppableId) return [];
  let newData = cloneDeep(data);
  const currentColumnIndex = data.findIndex((col) => col?._id === source.droppableId);
  if (currentColumnIndex === -1) return [];
  const nextColumnIndex = data.findIndex((col) => col?._id === destination.droppableId);
  if (nextColumnIndex === -1) return [];
  const currentColumn = cloneDeep(data[currentColumnIndex]);
  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const newItems = reorder(currentColumn.items, source.index, destination.index);
    newData[currentColumnIndex].items = newItems;
    return newData;
  }
  // moving to different list
  const target = currentColumn.items[source.index];
  const nextColumn = cloneDeep(data[nextColumnIndex]);
  // remove from original
  currentColumn.items.splice(source.index, 1);
  // insert into next
  nextColumn.items.splice(destination.index, 0, target);
  newData[currentColumnIndex] = currentColumn;
  newData[nextColumnIndex] = nextColumn;
  return newData;
}
