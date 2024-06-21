import concatArray from '@/helpers/arrayHelpers/concatArray';
import toNestedDataArray from '@/helpers/arrayHelpers/toNestedDataArray';
import intOrDefault from '@/helpers/formatHelpers/intOrDefault';
import EMPTY_GUID from '@/helpers/stringHelpers/EMPTY_GUID';
import isNotEmptyGuid from '@/helpers/stringHelpers/isNotEmptyGuid';
import { styled } from '@mui/material';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import { clone, cloneDeep, omit, uniqBy } from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import type { OfficerPickerItemProps } from './OfficerPickerItem';
import OfficerPickerItem from './OfficerPickerItem';
import type { OfficerInfo } from './api';
import api from './api';
import { useOfficerTreeSetState, useOfficerTreeState } from './context';
const BoxList = styled(Box)<BoxProps>(({ theme }) => ({
  flex: 1,
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'auto',
  opacity: 'inherit',
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.common.black,
  userSelect: 'none',
  padding: '8px',
  border: '8px',
  paddingBottom: 0,
  transition: 'background-color 0.2s ease, opacity 0.1s ease',
}));
const scrollContainerHeight = 250;
const BoxDropZone = styled(Box)<BoxProps>({
  height: '100%',
  minHeight: `${scrollContainerHeight}px`,
  paddingBottom: '8px',
});
const BoxScrollContainer = styled(Box)<BoxProps>({
  flex: 1,
  overflowX: 'hidden',
  overflowY: 'auto',
});
function removeParentIdIfEmpty(data: OfficerInfo[]): OfficerInfo[] {
  return (
    data?.map?.((item) => {
      if (isNotEmptyGuid(item?.ParentId)) {
        return item;
      } else {
        return omit(item, 'ParentId');
      }
    }) || []
  );
}
function indexing(
  tree: OfficerInfo[],
  startIndex: number,
  dict: Partial<{ [x: number]: string }>
): { data: OfficerInfo[]; endIndex: number; dict: Partial<{ [x: number]: string }> } {
  const data = cloneDeep(tree);
  let _dict = clone(dict);
  let endIndex = clone(startIndex);
  data.forEach((item) => {
    if ((item as any)?._childrens instanceof Array && (item as any)._childrens.length > 0) {
      const {
        data: childs,
        endIndex: _endIndex,
        dict: __dict,
      } = indexing((item as any)._childrens, endIndex, _dict);
      (item as any)._childrens = childs;
      _dict = __dict;
      endIndex = _endIndex;
    } else {
      endIndex++;
      (item as any)._index = endIndex;
      _dict = { ..._dict, [endIndex]: (item as any).Id };
    }
  });
  return { data, endIndex, dict: _dict };
}
function buildOfficersTree(officers: OfficerInfo[]): {
  tree: OfficerInfo[];
  indexDict: Partial<{ [x: number]: string }>;
} {
  const tree = toNestedDataArray(officers, {
    idField: 'Id',
    parentIdField: 'ParentId',
    hasParentWhen: (officer) => isNotEmptyGuid(officer?.ParentId),
    sortFn: (l, r) => intOrDefault(r?.IdInt, 0) - intOrDefault(l?.IdInt, 0),
  });
  const { data, dict } = indexing(tree, 0, {});
  return { tree: data, indexDict: dict };
}
export default function OfficerPickerItemList() {
  const processId = useOfficerTreeState((s) => s?.processId);
  const taskId = useOfficerTreeState((s) => s?.taskId);
  const officers = useOfficerTreeState((s) => s?.officers);
  const setContextValues = useOfficerTreeSetState();
  useEffect(() => {
    if (!processId || !taskId) return;
    api({ processId, taskId }).then((data) => {
      const newOfficers = removeParentIdIfEmpty(data);
      setContextValues?.({ officers: newOfficers });
    });
  }, [processId, taskId, setContextValues]);
  const loadMore: Required<OfficerPickerItemProps>['onLoadMore'] = useCallback(
    ({ unitId }) => {
      if (!unitId) return;
      api({ processId, taskId, donViId: unitId }).then((data) => {
        let newOfficers = removeParentIdIfEmpty(data);
        newOfficers = uniqBy(concatArray(officers, newOfficers), (o) => o?.Id);
        setContextValues?.({ officers: newOfficers });
      });
    },
    [processId, taskId, officers, setContextValues]
  );
  const nestedData = useMemo(() => {
    if (!officers) return { tree: [], indexDict: {} };
    if (!Array.isArray(officers)) return { tree: [], indexDict: {} };
    if (officers.length === 0) return { tree: [], indexDict: {} };
    const data = buildOfficersTree(officers);
    return data;
  }, [officers]);
  useEffect(() => {
    setContextValues?.({ treeData: nestedData.tree });
  }, [nestedData?.tree, setContextValues]);
  useEffect(() => {
    setContextValues?.({ indexDict: nestedData.indexDict });
  }, [nestedData?.indexDict, setContextValues]);
  const $Items = useMemo(
    () =>
      nestedData?.tree?.map?.((officer) => {
        return (
          <OfficerPickerItem
            key={officer.Id}
            index={(officer as any)?._index}
            data={officer}
            level={0}
            onLoadMore={loadMore}
          />
        );
      }),
    [nestedData, loadMore]
  );
  return (
    <Droppable droppableId={EMPTY_GUID} type="ITEM">
      {(dropProvided, dropSnapshot) => (
        <BoxList {...dropProvided.droppableProps}>
          <BoxScrollContainer>
            <Box sx={{ height: '100%' }}>
              <BoxDropZone ref={dropProvided.innerRef}>
                {$Items}
                {dropProvided.placeholder}
              </BoxDropZone>
            </Box>
          </BoxScrollContainer>
        </BoxList>
      )}
    </Droppable>
  );
}
