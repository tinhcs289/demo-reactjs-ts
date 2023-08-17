import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldRadio = field({
  name: 'RadioField',
  inputType: 'radio',
  label: 'Input dạng lựa chọn duy nhất (radio-box)',
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'RadioField',
      codeExample: `import { field, formItemSx } from '@/components/form';
field({
name: 'RadioField',
inputType: 'radio',
label: 'Input dạng lựa chọn duy nhất (radio box)',
md: 4,
sx: formItemSx,
})
    `,
    }),
  ],
});
