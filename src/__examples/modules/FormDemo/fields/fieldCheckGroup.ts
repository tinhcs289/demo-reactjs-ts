import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldCheckGroup = field({
  name: 'CheckGroupField',
  inputType: 'check-group',
  label: 'Input dạng danh sách lựa chọn (Checkbox Group)',
  componentProps: {
    options: Object.keys([...Array(5)]).map((i) => ({
      label: `${
        +i + 1
      }. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      value: `${+i + 1}`,
    })),
  },
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'CheckGroupField',
      codeExample: `import { field, formItemSx } from '@/components/form';
field({
  name: 'CheckGroupField',
  inputType: 'check-group',
  label: 'Input dạng danh sách lựa chọn (Checkbox Group)',
  componentProps: {
    options: Object.keys([...Array(5)]).map((i) => ({
      label: \`\${+i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\`,
      value: \`\${+i + 1}\`,
    })),
  },
  sx: formItemSx,
})`,
    }),
  ],
});
