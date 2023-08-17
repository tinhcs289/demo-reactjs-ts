import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldDateMulti = field({
  name: 'DateMultiField',
  inputType: 'date-multi',
  label: 'Input dạng nhiều giá trị ngày',
  sx: formItemSx,
  componentProps: {
    placeholder: 'Chọn các ngày',
    buttonOk: 'Chọn',
    ButtonNegative: 'Hủy',
    buttonClear: 'Đóng',
  },
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'DateMultiField',
      codeExample: `import { field, formItemSx } from '@/components/form';
field({
  name: 'DateMultiField',
  inputType: 'date-multi',
  label: 'Input dạng nhiều giá trị ngày',
  sx: formItemSx,
  componentProps: {
    placeholder: 'Chọn các ngày',
    buttonOk: 'Chọn',
    ButtonNegative: 'Hủy',
    buttonClear: 'Đóng',
  },
})`,
    }),
  ],
});
