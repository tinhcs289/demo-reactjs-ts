import wait from '@/helpers/asyncHelpers/wait';
import newGuid from '@/helpers/stringHelpers/newGuid';
import type { DndBoardColumnData, BoxDndBoardProps } from '@/modules/DnDBoard';
import type { MockItem } from '@/modules/DnDBoard/mock';
import { mockData } from '@/modules/DnDBoard/mock';
import { lazy, useCallback, useState } from 'react';
const DndBoard = lazy(() => wait().then(() => import('@/modules/DnDBoard')));
const rootDndId = newGuid();
type OnUpdateBoard = Required<BoxDndBoardProps<MockItem>>['onUpdate'];
export default function BoardDemo() {
  const [boardData, setBoardData] = useState<DndBoardColumnData<MockItem>[]>(mockData as DndBoardColumnData<MockItem>[]);
  const handleChangeData: OnUpdateBoard = useCallback((newData) => {
    setBoardData(newData);
  }, [])
  return (
    <DndBoard
      data={boardData}
      rootDroppableId={rootDndId}
      onUpdate={handleChangeData as any}
      sx={{
        padding: '16px',
        columnGap: '16px',
      }}
    />
  );
}
