import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldToggleMulti = field({
  name: 'Toggle2',
  inputType: 'toggle',
  label: 'Input dạng lựa chọn nhiều giá trị bằng phím bấm (Toggle multiple)',
  sx: formItemSx,
  componentProps: {
    fullWidth: true,
    multiple: true,
    options: [
      { value: 'MON', label: 'Thứ 2' },
      { value: 'TUE', label: 'Thứ 3' },
      { value: 'WED', label: 'Thứ 4' },
      { value: 'THU', label: 'Thứ 5' },
      { value: 'FRI', label: 'Thứ 6' },
      { value: 'SAT', label: 'Thứ 7' },
      { value: 'SUN', label: 'Chủ Nhật' },
    ],
  },
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'Toggle2',
      codeExample: `import { field, formItemSx } from '@/components/form';
field({
name: 'Toggle2',
inputType: 'toggle',
label: 'Input dạng lựa chọn nhiều giá trị bằng phím bấm (Toggle multiple)',
sx: formItemSx,
componentProps: {
  fullWidth: true,
  multiple: true,
  options: [
    { value: 'MON', label: 'Thứ 2' },
    { value: 'TUE', label: 'Thứ 3' },
    { value: 'WED', label: 'Thứ 4' },
    { value: 'THU', label: 'Thứ 5' },
    { value: 'FRI', label: 'Thứ 6' },
    { value: 'SAT', label: 'Thứ 7' },
    { value: 'SUN', label: 'Chủ Nhật' },
  ],
},
}),`,
    }),
  ],
});
