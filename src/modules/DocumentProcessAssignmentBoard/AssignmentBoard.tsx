import insertAt from '@/helpers/arrayHelpers/insertAt';
import arrayOrEmpty from '@/helpers/formatHelpers/arrayOrEmpty';
import EMPTY_GUID from '@/helpers/stringHelpers/EMPTY_GUID';
import { AnyObject } from '@/types';
import { styled } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import { cloneDeep, get } from 'lodash';
import { useCallback, useMemo } from 'react';
import type { DragDropContextProps } from 'react-beautiful-dnd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import AssignmentColumn from './AssignmentColumn';
import OfficerPicker from './OfficerPicker';
import type { DndBoardColumnData } from './_types';
import { OfficerTreeInit, OfficerTreeProvider, useOfficerTreeState } from './context';
import { reorderItemsBetweenColumns } from './functions';
const BoardRoot = styled(Box)<BoxProps>(() => ({
  height: '100%',
  width: '100%',
  display: 'inline-flex',
  gap: '16px',
}));
type HandleDrageEnd = Required<DragDropContextProps>['onDragEnd'];
export type AssignmentBoardProps<
  ItemDataType extends AnyObject = AnyObject,
  ColumnDataType extends AnyObject = AnyObject,
> = Partial<BoxProps> & {
  rootDroppableId: string;
  data: DndBoardColumnData<ItemDataType, ColumnDataType>[];
  onUpdate?: (newData: DndBoardColumnData<ItemDataType, ColumnDataType>[]) => void;
  processId: string;
  taskId: string;
  documentType: string;
  assigmentType: string;
};
function Board<ItemDataType extends AnyObject = AnyObject, ColumnDataType extends AnyObject = AnyObject>(
  props: Omit<
    AssignmentBoardProps<ItemDataType, ColumnDataType>,
    'processId' | 'taskId' | 'documentType' | 'assigmentType'
  >
) {
  const { data, rootDroppableId: rootId, onUpdate, ...otherProps } = props;
  const rootDroppableId = useMemo(() => rootId, [rootId]);
  const columns = useMemo(() => arrayOrEmpty(data), [data]);
  const officers = useOfficerTreeState((s) => s?.officers);
  const indexDict = useOfficerTreeState((s) => s?.indexDict);
  const onDragEnd: HandleDrageEnd = useCallback(
    (result, _provided) => {
      const { type, source, destination } = result || {};
      if (!destination || !Number.isInteger(destination?.index) || !destination?.droppableId) return;
      if (!source || !Number.isInteger(source?.index) || !source?.droppableId) return;
      if (type !== 'ITEM') return;
      const isDragFromPicker = source.droppableId === EMPTY_GUID;
      if (isDragFromPicker) {
        const officerId = get(indexDict, source.index);
        if (!officerId) return;
        const officer = officers.find((o) => o?.Id === officerId);
        if (!officer) return;
        const newColumns = cloneDeep(columns);
        const targetColumnIndex = newColumns.findIndex((c) => c?._id === destination?.droppableId);
        if (targetColumnIndex === -1) return;
        newColumns[targetColumnIndex].items = insertAt(
          newColumns[targetColumnIndex].items,
          { ...officer, _id: officer.Id } as any,
          destination.index
        );
        setTimeout(() => {
          onUpdate?.(newColumns);
        }, 0);
        return;
      } else {
        const isDropOnTheSame =
          source.droppableId === destination.droppableId && source.index === destination.index;
        if (isDropOnTheSame) {
          return;
        }
        const officer = columns.find((c) => c?._id === source.droppableId)?.items?.[source?.index];
        if (!officer) return;
        const newColumnsWithItems = reorderItemsBetweenColumns({
          data: columns,
          source,
          destination,
        });
        setTimeout(() => {
          onUpdate?.(newColumnsWithItems);
        }, 0);
      }
      return;
    },
    [columns, onUpdate, officers, indexDict]
  );
  const $Columns = useMemo(() => {
    return columns.map((col, i) => <AssignmentColumn key={`${col?._id}`} columnIndex={i + 1} data={col} />);
  }, [columns]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={rootDroppableId}
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={false}
        isCombineEnabled={true}
        isDropDisabled={true}
      >
        {(provided) => (
          <BoardRoot {...otherProps} ref={provided.innerRef} {...provided.droppableProps}>
            <OfficerPicker />
            {$Columns}
            {provided.placeholder}
          </BoardRoot>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default function AssignmentBoard<
  ItemDataType extends AnyObject = AnyObject,
  ColumnDataType extends AnyObject = AnyObject,
>(props: AssignmentBoardProps<ItemDataType, ColumnDataType>) {
  const { processId, taskId, documentType, assigmentType, ...otherProps } = props;
  return (
    <OfficerTreeProvider>
      <OfficerTreeInit
        processId={processId}
        taskId={taskId}
        documentType={documentType}
        assigmentType={assigmentType}
      />
      <Board {...otherProps} />
    </OfficerTreeProvider>
  );
}
