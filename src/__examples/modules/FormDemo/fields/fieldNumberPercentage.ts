import { field, formItemSx } from '@/components/form';
import { withPercentageFormat } from '@/components/inputs/CommonNumberField';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldNumberPercentage = field({
  name: 'NumberField2',
  inputType: 'number',
  label: 'Input dạng nhập liệu số phần trăm (Number Percentage)',
  componentProps: {
    placeholder: 'Nhập số',
    suffix: ' %',
  },
  hocs: [withPercentageFormat as any],
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'NumberField2',
      codeExample: `import { field, formItemSx } from '@/components/form';
import { withPercentageFormat } from '@/components/inputs/CommonNumberField';
field({
  name: 'NumberField2',
  inputType: 'number',
  label: 'Input dạng nhập liệu số (Number Percentage)',
  componentProps: {
    placeholder: 'Nhập số',
    suffix: ' %',
  },
  sx: formItemSx,
  hocs: [withPercentageFormat],
});`,
    }),
  ],
});
