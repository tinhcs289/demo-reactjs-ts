import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
import { i18n } from '@/translation';
export const fieldText = field({
  name: 'TextField',
  inputType: 'text',
  label: 'Input dạng nhập liệu (Text)',
  componentProps: {
    placeholder: i18n.t('common:pleaseEnter'),
  },
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'TextField',
      codeExample: `import { field, formItemSx } from '@/components/form';
  field({
    name: 'TextField',
    inputType: 'text',
    label: 'Input dạng nhập liệu văn bản (Text)',
    componentProps: {
      placeholder: "Nhập văn bản",
    },
    sx: formItemSx,
  }),`,
    }),
  ],
});
