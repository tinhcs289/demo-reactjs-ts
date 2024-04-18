import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import withHOCs from '@/hocs/withHocs';
import { AnyObject } from '@/types';
import { styled } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import type { ComponentType, ReactNode } from 'react';
import { useCallback, useMemo } from 'react';
import type { DragDropContextProps, DroppableProps } from 'react-beautiful-dnd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type { BoxDndColumnProps } from './BoxDndColumn';
import BoxDndColumn from './BoxDndColumn';
import type { DndBoardColumnData } from './_types';
import { reorder, reorderItemsBetweenColumns } from './functions';
const BoardRoot = styled(Box)<BoxProps>(() => ({
  height: '100%',
  width: '100%',
  display: 'inline-flex',
}));
type HandleDrageEnd = Required<DragDropContextProps>['onDragEnd'];
function DndBoardLayoutDefault(props: { children?: ReactNode }) {
  const { children } = props;
  return <>{children}</>;
}
type DndBoardColumnHOC<
  ItemDataType extends AnyObject = AnyObject,
  ColumnDataType extends AnyObject = AnyObject,
> = (
  ColumnComponent: ComponentType<BoxDndColumnProps<ItemDataType, ColumnDataType>>
) => ComponentType<BoxDndColumnProps<ItemDataType, ColumnDataType>>;
export type BoxDndBoardProps<
  ItemDataType extends AnyObject = AnyObject,
  ColumnDataType extends AnyObject = AnyObject,
> = Partial<BoxProps> & {
  rootDroppableId: string;
  data: DndBoardColumnData<ItemDataType, ColumnDataType>[];
  dndRootContextProps?: Partial<DragDropContextProps>;
  dndRootDroppableProps?: Partial<DroppableProps>;
  onUpdate?: (newData: DndBoardColumnData<ItemDataType, ColumnDataType>[]) => void;
  layout?: ComponentType<any>;
  columnProps?:
    | Partial<BoxDndColumnProps<ItemDataType, ColumnDataType>>
    | ((
        column: DndBoardColumnData<ItemDataType, ColumnDataType>,
        index: number
      ) => Partial<BoxDndColumnProps<ItemDataType, ColumnDataType>>);
  columnHocs?: DndBoardColumnHOC<ItemDataType, ColumnDataType>[];
  ColumnComponent?: ComponentType<BoxDndColumnProps<ItemDataType, ColumnDataType>>;
};
export default function BoxDndBoard<
  ItemDataType extends AnyObject = AnyObject,
  ColumnDataType extends AnyObject = AnyObject,
>(props: BoxDndBoardProps<ItemDataType, ColumnDataType>) {
  const {
    data,
    rootDroppableId: rootId,
    dndRootContextProps,
    dndRootDroppableProps,
    onUpdate,
    layout: BoardLayout = DndBoardLayoutDefault,
    ColumnComponent = BoxDndColumn,
    columnProps,
    columnHocs,
    ...otherProps
  } = props;
  const rootDroppableId = useMemo(() => rootId, [rootId]);
  const columns = useMemo(() => arrayOrEmpty(data), [data]);
  const onDragEnd: HandleDrageEnd = useCallback(
    (result, _provided) => {
      const { type, source, destination } = result || {};
      if (!destination) return;
      if (!source) return;
      if (type !== 'COLUMN' && result?.type !== 'ITEM') return;
      const isDropOnTheSame =
        source.droppableId === destination.droppableId && source.index === destination.index;
      if (isDropOnTheSame) {
        return;
      }
      // DnD Column
      if (type === 'COLUMN') {
        const newColumns = reorder(columns, source.index, destination.index);
        setTimeout(() => {
          onUpdate?.(newColumns);
        }, 0);
        return;
      }
      // DnD Item
      const newColumnsWithItems = reorderItemsBetweenColumns({
        data: columns,
        source,
        destination,
      });
      setTimeout(() => {
        onUpdate?.(newColumnsWithItems);
      }, 0);
      return;
    },
    [columns, onUpdate]
  );
  const $Columns = useMemo(() => {
    return columns.map((col, i) => {
      let _props: Partial<BoxDndColumnProps<ItemDataType, ColumnDataType>> = {};
      if (typeof columnProps === 'function') {
        _props = columnProps(col, i);
      } else if (typeof columnProps === 'object') {
        _props = columnProps;
      }
      let Column = ColumnComponent as ComponentType<BoxDndColumnProps<ItemDataType, ColumnDataType>>;
      if (columnHocs instanceof Array && columnHocs.length > 0) {
        Column = withHOCs(...columnHocs)(ColumnComponent);
      }
      return <Column {..._props} key={`${col?._id}`} columnIndex={i} data={col} />;
    });
  }, [columns, columnProps, columnHocs, ColumnComponent]);
  return (
    <DragDropContext {...dndRootContextProps} onDragEnd={onDragEnd}>
      <Droppable
        droppableId={rootDroppableId}
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={false}
        isCombineEnabled={true}
        {...dndRootDroppableProps}
      >
        {(provided) => (
          <BoardRoot {...otherProps} ref={provided.innerRef} {...provided.droppableProps}>
            <BoardLayout>{$Columns}</BoardLayout>
            {provided.placeholder}
          </BoardRoot>
        )}
      </Droppable>
    </DragDropContext>
  );
}
