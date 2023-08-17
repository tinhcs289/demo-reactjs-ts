import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldTime = field({
  name: 'TimeField',
  inputType: 'time',
  label: 'Input dạng giờ',
  componentProps: {
    placeholder: 'Chọn giờ',
    buttonOk: 'Chọn',
    ButtonNegative: 'Hủy',
    buttonClear: 'Xóa',
  },
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'TimeField',
      codeExample: `import { field, formItemSx } from '@/components/form';
      field({
        name: 'TimeField',
        inputType: 'time',
        label: 'Input dạng giờ',
        componentProps: {
          placeholder: 'Chọn giờ',
          buttonOk: 'Chọn',
          ButtonNegative: 'Hủy',
          buttonClear: 'Xóa',
        },
        sx: formItemSx,
      })`,
    }),
  ],
});
