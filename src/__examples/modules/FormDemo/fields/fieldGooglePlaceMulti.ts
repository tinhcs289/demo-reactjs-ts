import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
export const fieldGooglePlaceMulti = field({
  name: 'Places',
  inputType: 'google-places',
  label: 'Input dạng tìm kiếm nhiều địa điểm Google Map',
  componentProps: {
    multiple: true,
    placeholder: 'Tìm kiếm địa điểm',
  },
  sx: formItemSx,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'Places',
      codeExample: `import { field, formItemSx } from '@/components/form';
field({
  name: 'Places',
  inputType: 'google-places',
  label: 'Input dạng tìm kiếm nhiều địa điểm Google Map',
  componentProps: {
    multiple: true,
    placeholder: 'Tìm kiếm địa điểm',
  },
  sx: formItemSx,
});`,
    }),
  ],
});
