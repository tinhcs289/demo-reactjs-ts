import { field, formItemSx } from '@/components/form';
import RHFAssignmentBoard, { withProcessIdAndTaskId } from './components-imported/RHFAssignmentBoard';
export const MUTATE_ACTION = 'create_assigment';
export const fields = [
  field({
    name: 'Assignees',
    inputType: 'field-unknown',
    sx: formItemSx,
    component: RHFAssignmentBoard,
    hocs: [withProcessIdAndTaskId],
  }),
  field({
    name: 'IsSendViaEmail',
    inputType: 'check',
    label: 'Nhận qua email',
    md: 6,
    sx: formItemSx,
  }),
  field({
    name: 'IsRequiredReply',
    inputType: 'check',
    label: 'Yêu cầu trả lời',
    md: 6,
    sx: formItemSx,
  }),
  field({
    name: 'AssigmentNote',
    inputType: 'text',
    label: 'Nội dung phân xử lý',
    sx: formItemSx,
    componentProps: { multiline: true, rows: 3 },
  }),
];
