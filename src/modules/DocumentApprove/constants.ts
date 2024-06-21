import { field, formItemSx } from '@/components/form';
export const fields = [
  field({
    name: 'Comment',
    inputType: 'text',
    label: 'Ý kiến',
    sx: formItemSx,
    componentProps: {
      multiline: true,
      rows: 4,
    },
  }),
];
