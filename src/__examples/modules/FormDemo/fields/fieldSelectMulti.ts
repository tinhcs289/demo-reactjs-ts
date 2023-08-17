import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldSelectMulti = field({
  name: 'SelectMultiField',
  inputType: 'select-multi',
  label: 'Input dạng lựa chọn nhiều giá trị bằng menu xổ xuống (Dropdown Select)',
  componentProps: {
    placeholder: 'Lựa chọn giá trị',
    options: Object.keys([...Array(20)]).map((i) => ({
      label: `lựa chọn ${+i + 1}`,
      value: `${+i + 1}`,
    })),
    multiple: true,
  },
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'SelectMultiField',
      codeExample: `
      field({
        name: 'SelectMultiField',
        inputType: 'select-multi',
        label: 'Input dạng lựa chọn nhiều giá trị bằng menu xổ xuống (Dropdown Select)',
        componentProps: {
          placeholder: 'Lựa chọn giá trị',
          options: Object.keys([...Array(20)]).map((i) => ({
            label: \`lựa chọn \${i}\`,
            value: \`\${i}\`,
          })),
          multiple: true,
        },
        sx: formItemSx,
      });
      `,
    }),
  ],
});
