import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldTextTags = field({
  name: 'TagInputField',
  inputType: 'text-tags',
  label: 'Input dạng nhập liệu Tag (Tags Input)',
  componentProps: {
    placeholder: 'Nhập các từ khóa, ấn "Enter" để thêm từ khóa mới',
  },
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'TagInputField',
      codeExample: `import { field, formItemSx } from '@/components/form';
field({
  name: 'TagInputField',
  inputType: 'text-tags',
  label: 'Input dạng nhập liệu Tag (Tags Input)',
  componentProps: {
    placeholder: ''Nhập các từ khóa, ấn "Enter" để thêm từ khóa mới',
  },
  sx: formItemSx,
});`,
    }),
  ],
});
