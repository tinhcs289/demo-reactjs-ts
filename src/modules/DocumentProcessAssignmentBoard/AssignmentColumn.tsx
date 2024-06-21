import { CommonTypography } from '@/components/typo';
import type { AnyObject } from '@/types';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useMemo } from 'react';
import type { DraggableProps, DroppableProps } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import AssignmentColumnItemList from './AssignmentColumnItemList';
import type { DndBoardColumnData } from './_types';
import { PROCESS_RESPONSIBILITY, SIGN_RESPONSIBILITY } from './constants';
import { useOfficerTreeState } from './context';
const BoxColumn = styled(Box, { shouldForwardProp: (p) => p !== 'isDragging' })<
  BoxProps & { isDragging?: boolean }
>(({ theme, isDragging }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  ...(!!isDragging
    ? {
        boxShadow: theme.shadows[20],
      }
    : {}),
  maxHeight: '600px',
  overflowY: 'auto',
}));
const BoxColumnHead = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopLeftRadius: '2px',
  borderTopRightRadius: '2px',
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.common.black,
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
  },
  height: 40,
}));
export type AssignmentColumnProps<
  ItemDataType extends AnyObject = AnyObject,
  ColumnDataType extends AnyObject = AnyObject,
> = Partial<BoxProps> & {
  columnIndex: number;
  data: DndBoardColumnData<ItemDataType, ColumnDataType>;
  dndColumnDraggableProps?: Partial<DraggableProps>;
  scrollable?: boolean;
  droppableProps?: Partial<DroppableProps>;
};
export default function AssignmentColumn<
  ItemDataType extends AnyObject = AnyObject,
  ColumnDataType extends AnyObject = AnyObject,
>(props: AssignmentColumnProps<ItemDataType, ColumnDataType>) {
  const { columnIndex, data, dndColumnDraggableProps, scrollable, droppableProps, ...otherProps } = props;
  const assigmentType = useOfficerTreeState((s) => s?.assigmentType);
  const index = useMemo(() => columnIndex, [columnIndex]);
  const columnId = useMemo(() => `${data?._id}`, [data?._id]);
  const columnData = useMemo(() => data, [data]);
  const columnName = useMemo(() => {
    const key = (columnData?.data?.key as string) || '';
    if (assigmentType === 'sign') {
      return (SIGN_RESPONSIBILITY as any)[key] || '';
    }
    if (assigmentType === 'process') {
      return (PROCESS_RESPONSIBILITY as any)[key] || '';
    }
    return '';
  }, [columnData?.data?.key, assigmentType]);
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
          <BoxColumnHead>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
              //{...provided.dragHandleProps}
            >
              <CommonTypography
                textAlign="center"
                textTransform="uppercase"
                fontWeight={500}
                color="GrayText"
                sx={{
                  userSelect: 'none',
                }}
              >
                {columnName}
              </CommonTypography>
            </Box>
          </BoxColumnHead>
          <AssignmentColumnItemList
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
