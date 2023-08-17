import { field, formItemSx } from '@/components/form';
import { withCurrencyFormat } from '@/components/inputs/CommonNumberField';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldNumberCurrency = field({
  name: 'NumberField1',
  inputType: 'number',
  label: 'Input dạng nhập liệu số tiền (Number Currency)',
  componentProps: {
    placeholder: 'Nhập số',
    suffix: ' VND',
  },
  hocs: [withCurrencyFormat as any],
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'NumberField1',
      codeExample: `import { field, formItemSx } from '@/components/form';
import { withCurrencyFormat } from '@/components/inputs/CommonNumberField';
field({
  name: 'NumberField1',
  inputType: 'number',
  label: 'Input dạng nhập liệu số (Number Currency)',
  componentProps: {
    placeholder: 'Nhập số',
    suffix: ' VND',
  },
  sx: formItemSx,
  hocs: [withCurrencyFormat],
});`,
    }),
  ],
});
