import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldCKEditor = field({
  name: 'PageContent',
  label: 'Input dạng soạn thảo bằng CK Editor',
  inputType: 'ckeditor',
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'PageContent',
      codeExample: `import { field, formItemSx } from '@/components/form';
field({
  name: 'PageContent',
  label: 'Input dạng soạn thảo bằng CK Editor',
  inputType: 'ckeditor',
  sx: formItemSx,
})`,
    }),
  ],
});
