import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldGooglePlace = field({
  name: 'Place',
  inputType: 'google-place',
  label: 'Input dạng tìm kiếm địa điểm Google Map',
  componentProps: {
    placeholder: 'Tìm kiếm địa điểm',
  },
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'Place',
      codeExample: `import { field, formItemSx } from '@/components/form';
field({
  name: 'Place',
  inputType: 'google-place',
  label: 'Input dạng tìm kiếm địa điểm Google Map',
  componentProps: {
    placeholder: 'Tìm kiếm địa điểm',
  },
  sx: formItemSx,
})`,
    }),
  ],
});
