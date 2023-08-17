import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
import type { ComponentType } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
export default function withDisplayBySwitch(WrappedComponent: ComponentType<any>): ComponentType<any> {
  return function FieldWithDisplayBySwitch(props: any) {
    const { control } = useFormContext();
    const shouldDisplay = useWatch({ name: 'SwitchField', control }) as boolean;
    return !shouldDisplay ? <WrappedComponent {...props} /> : null;
  };
}
export const fieldCheck = field({
  name: 'CheckField',
  inputType: 'check',
  label: 'Input dạng tích chọn (check-box)',
  gridFieldHocs: [
    withDisplayBySwitch,
    withComponentExplainDoc({
      fieldName: 'CheckField',
      codeExample: `import { field, formItemSx } from '@/components/form';
import withDisplayBySwitch from './hocs/withDisplayBySwitch';
field({
name: 'CheckField',
inputType: 'check',
label: 'Input dạng tích chọn (check-box)',
sx: formItemSx,
gridFieldHocs: [withDisplayBySwitch],
})
    `,
    }),
  ],
  sx: formItemSx,
});
