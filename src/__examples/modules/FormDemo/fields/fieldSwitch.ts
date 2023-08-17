import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldSwitch = field({
  name: 'SwitchField',
  inputType: 'switch',
  label: 'Input dạng bật/tắt (switch)',
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'SwitchField',
      codeExample: `import { field, formItemSx } from '@/components/form';
field({
name: 'SwitchField',
inputType: 'switch',
label: 'Input dạng bật/tắt (switch)',
sx: formItemSx,
})`,
    }),
  ],
  sx: formItemSx,
});
