import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import { AnyObject } from '@/types';
import { styled, alpha } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import { useMemo } from 'react';
import type {
  DraggableProps,
  DroppableProvided,
  DraggableStateSnapshot,
  DroppableProps,
} from 'react-beautiful-dnd';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import BoxDndItem from './BoxDndItem';
import type { DndBoardColumnData } from './_types';
const BoxList = styled(Box, {
  shouldForwardProp: (p) => p !== 'isDraggingOver' && p !== 'isDraggingFrom' && p !== 'isDropDisabled',
})<
  BoxProps & {
    isDraggingOver?: boolean;
    isDraggingFrom?: boolean;
    isDropDisabled?: boolean;
  }
>(({ theme, isDraggingOver, isDraggingFrom, isDropDisabled }) => ({
  flex: 1,
  height: '100%',
  width: '250px',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'auto',
  opacity: !!isDropDisabled ? 0.5 : 'inherit',
  backgroundColor: (() => {
    if (!!isDraggingOver) {
      return alpha(theme.palette.primary.light, 0.2);
    }
    if (!!isDraggingFrom) {
      return theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[900];
    }
    return theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.common.black;
  })(),
  userSelect: 'none',
  padding: '8px',
  border: '8px',
  paddingBottom: 0,
  transition: 'background-color 0.2s ease, opacity 0.1s ease',
}));
const scrollContainerHeight = 250;
const BoxDropZone = styled(Box)<BoxProps>({
  /* stop the list collapsing when empty */
  minHeight: `${scrollContainerHeight}px`,
  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  paddingBottom: '8px',
});
const BoxScrollContainer = styled(Box)<BoxProps>({
  flex: 1,
  overflowX: 'hidden',
  overflowY: 'auto',
});
export type BoxDndColumnItemListInnerProps<ItemDataType extends AnyObject = AnyObject> = BoxProps & {
  dropProvided: DroppableProvided;
  data: ItemDataType[];
  dropzoneProps?: Partial<BoxProps>;
  itemDraggableProps?:
    | Partial<DraggableProps>
    | ((item: ItemDataType, index: number) => Partial<DraggableProps>);
};
function BoxDndColumnItemListInner<ItemDataType extends AnyObject = AnyObject>(
  props: BoxDndColumnItemListInnerProps<ItemDataType>
) {
  const { data, dropProvided, dropzoneProps, itemDraggableProps, ...otherProps } = props;
  const $Item = useMemo(
    () =>
      data?.map?.((item, index) => {
        let draggableProps: Partial<DraggableProps> = {};
        if (typeof itemDraggableProps === 'function') {
          draggableProps = itemDraggableProps(item, index);
        } else if (itemDraggableProps instanceof Object) {
          draggableProps = itemDraggableProps;
        }
        return (
          <Draggable {...draggableProps} key={`${item._id}`} draggableId={`${item._id}`} index={index}>
            {(dragProvided, dragSnapshot) => (
              <BoxDndItem
                key={item._id}
                index={index}
                data={item}
                dragSnapshot={dragSnapshot}
                draggableProvided={dragProvided}
              />
            )}
          </Draggable>
        );
      }),
    [data, itemDraggableProps]
  );
  return (
    <Box {...otherProps}>
      <BoxDropZone {...dropzoneProps} sx={{ height: '100%', ...dropzoneProps }} ref={dropProvided.innerRef}>
        {$Item}
        {dropProvided.placeholder}
      </BoxDropZone>
    </Box>
  );
}
export type BoxDndColumnItemListProps<
  ItemDataType extends AnyObject = AnyObject,
  ColumnDataType extends AnyObject = AnyObject,
> = {
  droppableId: string;
  draggableSnapshot: DraggableStateSnapshot;
  data: DndBoardColumnData<ItemDataType, ColumnDataType>;
  scrollable?: boolean;
  droppableProps?: Partial<DroppableProps>;
  disabledDrop?: boolean;
  boxListProps?: Partial<BoxProps>;
  boxScrollerProps?: Partial<BoxProps>;
};
export default function BoxDndColumnItemList<
  ItemDataType extends AnyObject = AnyObject,
  ColumnDataType extends AnyObject = AnyObject,
>(props: BoxDndColumnItemListProps<ItemDataType, ColumnDataType>) {
  const { droppableProps, boxListProps, scrollable, data, disabledDrop, boxScrollerProps } = props;
  const droppableId = useMemo(() => `${data?._id}`, [data?._id]);
  const items = useMemo(() => arrayOrEmpty(data?.items), [data?.items]);
  return (
    <Droppable droppableId={droppableId} type="ITEM" {...droppableProps}>
      {(dropProvided, dropSnapshot) => (
        <BoxList
          {...boxListProps}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={!!disabledDrop}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {scrollable ? (
            <BoxScrollContainer {...boxScrollerProps}>
              <BoxDndColumnItemListInner data={items} dropProvided={dropProvided} sx={{ height: '100%' }} />
            </BoxScrollContainer>
          ) : (
            <BoxDndColumnItemListInner data={items} dropProvided={dropProvided} sx={{ height: '100%' }} />
          )}
        </BoxList>
      )}
    </Droppable>
  );
}
