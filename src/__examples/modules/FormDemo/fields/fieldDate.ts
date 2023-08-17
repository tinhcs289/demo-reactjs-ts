import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldDate = field({
  name: 'DateField',
  inputType: 'date',
  label: 'Input nhập liệu dạng ngày tháng',
  componentProps: {
    placeholder: 'Lựa chọn ngày tháng',
    buttonOk: 'Chọn',
    ButtonNegative: 'Đóng',
    buttonClear: 'Xóa',
  },
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'DateField',
      codeExample: `import { field, formItemSx } from '@/components/form';
field({
  name: 'DateField',
  inputType: 'date',
  label: 'Input nhập liệu dạng ngày tháng',
  componentProps: {
    placeholder: 'Lựa chọn ngày tháng',
    buttonOk: 'Chọn',
    ButtonNegative: 'Đóng',
    buttonClear: 'Xóa',
  },
  sx: formItemSx,
})`,
    }),
  ],
});
