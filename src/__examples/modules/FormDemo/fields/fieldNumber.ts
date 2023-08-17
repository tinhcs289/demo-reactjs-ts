import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldNumber = field({
  name: 'NumberField',
  inputType: 'number',
  label: 'Input dạng nhập liệu số (Number)',
  componentProps: {
    placeholder: 'Nhập số',
  },
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'NumberField',
      codeExample: `import { field, formItemSx } from '@/components/form';
field({
  name: 'NumberField',
  inputType: 'number',
  label: 'Input dạng nhập liệu số (Number)',
  componentProps: {
    placeholder: 'Nhập số',
  },
  sx: formItemSx,
});`,
    }),
  ],
});
