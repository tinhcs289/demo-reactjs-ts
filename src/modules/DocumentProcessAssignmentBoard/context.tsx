import createFastContext from '@/helpers/contextHelpers/createFastContext';
import type { OfficerInfo } from './api';
import type { NestedOfficersInfo } from './_types';
type OfficerTreeContextValues = {
  documentType: string;
  assigmentType: string;
  officers: OfficerInfo[];
  setOfficers: (data: OfficerInfo[]) => void;
  processId: string;
  taskId: string;
  pickedOfficerIds: string[];
  treeData: NestedOfficersInfo[];
  indexDict: Partial<{ [x: number]: string }>;
};
export const {
  Provider: OfficerTreeProvider,
  useDefaultPropInit: useOfficerTreeInit,
  useGetter: useOfficerTreeState,
  useSetter: useOfficerTreeSetState,
} = createFastContext<OfficerTreeContextValues>({
  documentType: '',
  assigmentType: '',
  officers: [],
  pickedOfficerIds: [],
  setOfficers: (_data) => {},
  processId: '',
  taskId: '',
  treeData: [],
  indexDict: {},
});
export function OfficerTreeInit(props: {
  documentType: string;
  processId: string;
  taskId: string;
  assigmentType: string;
}) {
  useOfficerTreeInit('processId', props?.processId, true);
  useOfficerTreeInit('taskId', props?.taskId, true);
  useOfficerTreeInit('documentType', props?.documentType, true);
  useOfficerTreeInit('assigmentType', props?.assigmentType, true);
  return <></>;
}
