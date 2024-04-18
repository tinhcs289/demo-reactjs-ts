import type { AnyObject } from '@/types';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import type { ComponentType } from 'react';
import { useMemo } from 'react';
import type { DraggableProps, DroppableProps } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import BoxDndColumnItemList from './BoxDndColumnItemList';
import type { DndBoardColumnData } from './_types';
const BoxColumn = styled(Box, { shouldForwardProp: (p) => p !== 'isDragging' })<
  BoxProps & { isDragging?: boolean }
>(({ theme, isDragging }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  ...(!!isDragging
    ? {
        boxShadow: theme.shadows[20],
      }
    : {}),
}));
const BoxColumnGrabToDrag = styled(Box, { shouldForwardProp: (p) => p !== 'isDragging' })<
  BoxProps & { isDragging?: boolean }
>(({ theme, isDragging }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopLeftRadius: '2px',
  borderTopRightRadius: '2px',
  backgroundColor: !!isDragging
    ? theme.palette.mode === 'light'
      ? theme.palette.primary.light
      : theme.palette.grey[800]
    : theme.palette.mode === 'light'
    ? theme.palette.grey[200]
    : theme.palette.common.black,
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.grey[900],
  },
  height: 60,
}));
export type BoxDndColumnWrapComponent = ComponentType<BoxProps>;
export type BoxDndColumnProps<
  ItemDataType extends AnyObject = AnyObject,
  ColumnDataType extends AnyObject = AnyObject,
> = Partial<BoxProps> & {
  columnIndex: number;
  data: DndBoardColumnData<ItemDataType, ColumnDataType>;
  dndColumnDraggableProps?: Partial<DraggableProps>;
  scrollable?: boolean;
  droppableProps?: Partial<DroppableProps>;
};
export default function BoxDndColumn<
  ItemDataType extends AnyObject = AnyObject,
  ColumnDataType extends AnyObject = AnyObject,
>(props: BoxDndColumnProps<ItemDataType, ColumnDataType>) {
  const { columnIndex, data, dndColumnDraggableProps, scrollable, droppableProps, ...otherProps } = props;
  const index = useMemo(() => columnIndex, [columnIndex]);
  const columnId = useMemo(() => `${data?._id}`, [data?._id]);
  const columnData = useMemo(() => data, [data]);
  return (
    <Draggable draggableId={columnId} index={index} {...dndColumnDraggableProps}>
      {(provided, snapshot) => (
        <BoxColumn
          component={Paper}
          {...otherProps}
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          <BoxColumnGrabToDrag isDragging={snapshot.isDragging}>
            <Box sx={{ width: '100%', height: '100%' }} {...provided.dragHandleProps}></Box>
          </BoxColumnGrabToDrag>
          <BoxDndColumnItemList
            droppableId={columnId}
            draggableSnapshot={snapshot}
            data={columnData}
            scrollable={scrollable}
            droppableProps={droppableProps}
          />
        </BoxColumn>
      )}
    </Draggable>
  );
}
