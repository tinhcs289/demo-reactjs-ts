import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldDateTime = field({
  name: 'DateTimeField',
  inputType: 'date-time',
  label: 'Input dạng ngày giờ',
  componentProps: {
    placeholder: 'Chọn ngày giờ',
    buttonOk: 'Chọn',
    ButtonNegative: 'Đóng',
    buttonClear: 'Xóa',
  },
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'DateTimeField',
      codeExample: `import { field, formItemSx } from '@/components/form';
field({
  name: 'DateTimeField',
  inputType: 'date-time',
  label: 'Input dạng ngày giờ',
  componentProps: {
    placeholder: 'Chọn ngày giờ',
    buttonOk: 'Chọn',
    ButtonNegative: 'Đóng',
    buttonClear: 'Xóa',
  },
  sx: formItemSx,
})`,
    }),
  ],
});
