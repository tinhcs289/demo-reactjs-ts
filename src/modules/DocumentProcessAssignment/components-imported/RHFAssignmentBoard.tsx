import type { RHFInputProps, RHFRenderInput } from '@/components/rhfInputs';
import wait from '@/helpers/asyncHelpers/wait';
import newGuid from '@/helpers/stringHelpers/newGuid';
import { useRHFWatchValue } from '@/hooks/useRHF';
import type { DocumentProcessAssignmentBoardColumnData } from '@/modules/DocumentProcessAssignmentBoard';
import {
  PROCESS_RESPONSIBILITY,
  SIGN_RESPONSIBILITY,
} from '@/modules/DocumentProcessAssignmentBoard/constants';
import type { ComponentType } from 'react';
import { lazy, useCallback, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import type { AssigmentPerOfficer, AssigmentResponsibility, AssigmentType, FormValues } from '../_types';
const Input = lazy(() => wait().then(() => import('@/modules/DocumentProcessAssignmentBoard')));
type DndColumnData = DocumentProcessAssignmentBoardColumnData<
  AssigmentPerOfficer,
  { key: AssigmentResponsibility }
>;
function convertToFormValues(data: DndColumnData[]): AssigmentPerOfficer[] {
  if (!data) return [];
  if (!(data instanceof Array)) return [];
  if (data.length === 0) return [];
  let values: AssigmentPerOfficer[] = [];
  data.forEach((column) => {
    const assignments: AssigmentPerOfficer[] = column?.items?.map?.((item) => ({
      Assignee: item as AssigmentPerOfficer['Assignee'],
      Responsibility: column.data?.key as AssigmentPerOfficer['Responsibility'],
    }));
    values = values.concat(assignments);
  });
  return values;
}
function getColumnDict(type?: AssigmentType): Record<AssigmentResponsibility, AssigmentPerOfficer[]> {
  if (type === 'sign') {
    return Object.keys(SIGN_RESPONSIBILITY).reduce((dict, key) => {
      return { ...dict, [key]: [] };
    }, {}) as Record<AssigmentResponsibility, AssigmentPerOfficer[]>;
  } else {
    return Object.keys(PROCESS_RESPONSIBILITY).reduce((dict, key) => {
      return { ...dict, [key]: [] };
    }, {}) as Record<AssigmentResponsibility, AssigmentPerOfficer[]>;
  }
}
function createColumnByDict(dict: Record<AssigmentResponsibility, AssigmentPerOfficer[]>) {
  const data: DndColumnData[] = Object.keys(dict).map((key) => ({
    _id: newGuid(),
    items: dict[key as AssigmentResponsibility].map((item) => ({
      _id: newGuid(),
      ...item,
    })),
    data: {
      key: key as any,
    },
  }));
  return data;
}
function convertToDndColumnData(values?: AssigmentPerOfficer[], type?: AssigmentType): DndColumnData[] {
  if (!values) return createColumnByDict(getColumnDict());
  if (!(values instanceof Array)) return createColumnByDict(getColumnDict(type));
  if (values.length === 0) return createColumnByDict(getColumnDict(type));
  const dict = getColumnDict(type);
  values.forEach((item) => {
    dict[item.Responsibility].push(item?.Assignee as any);
  });
  if (Object.keys(dict).length === 0) return [];
  const data = createColumnByDict(dict);
  return data;
}
export type RHFAssignmentBoardProps = RHFInputProps & {
  processId: string;
  taskId: string;
  documentType: string;
  assigmentType: string;
};
export function withProcessIdAndTaskId(
  WrappedComponent: ComponentType<RHFAssignmentBoardProps>
): ComponentType<RHFAssignmentBoardProps> {
  return function FieldWithProcessIdAndTaskId(props) {
    const ProcessId = useRHFWatchValue<Required<FormValues>['ProcessId']>('ProcessId');
    const TaskId = useRHFWatchValue<Required<FormValues>['TaskId']>('TaskId');
    const DocumentType = useRHFWatchValue<Required<FormValues>['DocumentType']>('DocumentType');
    const AssigmentType = useRHFWatchValue<Required<FormValues>['AssigmentType']>('AssigmentType');
    return (
      <WrappedComponent
        {...props}
        processId={ProcessId}
        taskId={TaskId}
        documentType={DocumentType}
        assigmentType={AssigmentType}
      />
    );
  };
}
export default function RHFAssignmentBoard(props: RHFAssignmentBoardProps) {
  const {
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    processId,
    documentType,
    assigmentType,
    taskId,
  } = props;
  const rootId = useMemo(() => newGuid(), []);
  const renderInput: RHFRenderInput = useCallback(
    ({ field: { onChange, value } }) => {
      const data = convertToDndColumnData(value, assigmentType as any);
      return (
        <Input
          rootDroppableId={rootId}
          data={data}
          onUpdate={(newData) => {
            const newValue = convertToFormValues(newData as any);
            onChange(newValue);
          }}
          processId={processId}
          taskId={taskId}
          documentType={documentType}
          assigmentType={assigmentType}
          // error={invalid}
          // {...(!!rules?.required ? { required: true } : {})}
          // {...(!!error?.message ? { errorText: error?.message } : {})}
          // {...inputProps}
        />
      );
    },
    [rootId, processId, taskId, documentType, assigmentType]
  );
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      {...(!!defaultValue ? { defaultValue } : {})}
      {...(typeof shouldUnregister === 'boolean' ? { shouldUnregister } : {})}
      render={renderInput}
    />
  );
}
