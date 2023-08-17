import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldSelectBoolean = field({
  name: 'SomeFieldName',
  inputType: 'select-boolean',
  label: 'Input dạng lựa chọn giá trị đúng/sai bằng menu xổ xuống (Dropdown Select True/False)',
  componentProps: {
    placeholder: 'Hãy lựa chọn',
    labelTrue: 'Đúng',
    labelFalse: 'Sai',
  },
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'SomeFieldName',
      codeExample: `import { field, formItemSx } from '@/components/form';
field({
  name: 'SomeFieldName',
  inputType: 'select-boolean',
  label: 'Input dạng lựa chọn giá trị đúng/sai bằng menu xổ xuống (Dropdown Select True/False)',
  componentProps: {
    placeholder: 'Hãy lựa chọn',
    labelTrue: 'Đúng',
    labelFalse: 'Sai',
  },
  sx: formItemSx,
});`,
    }),
  ],
});
