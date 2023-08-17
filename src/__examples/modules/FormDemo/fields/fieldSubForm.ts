import { field, formItemSx } from '@/components/form';
import { phone, email } from '@/constants/rhfRules';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
const subFields = [
  field({
    name: 'Title',
    inputType: 'text',
    label: 'Danh xưng',
    sx: formItemSx,
  }),
  field({
    name: 'FirstName',
    inputType: 'text',
    label: 'Tên',
    sx: formItemSx,
  }),
  field({
    name: 'Gender',
    inputType: 'select',
    label: 'Giới tính',
    sx: formItemSx,
    componentProps: {
      options: [
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' },
      ],
    },
  }),
  field({
    name: 'PhoneNumber',
    inputType: 'text',
    label: 'Số điện thoại',
    rules: { ...phone('Số điện thoại không đúng') },
    sx: formItemSx,
  }),
  field({
    name: 'EmailAddress',
    inputType: 'text',
    label: 'Email',
    rules: { ...email('Email không đúng') },
    sx: formItemSx,
  }),
  field({
    name: 'Address',
    inputType: 'text',
    label: 'Địa chỉ',
    sx: formItemSx,
    componentProps: { multiline: true, rows: 3 },
  }),
];
export const fieldSubForm = field({
  name: 'Contact',
  fields: subFields,
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'Contact',
      codeExample: `import { field, formItemSx } from '@/components/form';
import { phone, email } from '@/constants/rhfRules';
const subFields = [
  field({
    name: 'Title',
    inputType: 'text',
    label: 'Danh xưng',
    sx: formItemSx,
  }),
  field({
    name: 'FirstName',
    inputType: 'text',
    label: 'Tên',
    sx: formItemSx,
  }),
  field({
    name: 'Gender',
    inputType: 'select',
    label: 'Giới tính',
    sx: formItemSx,
    componentProps: {
      options: [
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' },
      ],
    },
  }),
  field({
    name: 'PhoneNumber',
    inputType: 'text',
    label: 'Số điện thoại',
    rules: { ...phone('Số điện thoại không đúng') },
    sx: formItemSx,
  }),
  field({
    name: 'EmailAddress',
    inputType: 'text',
    label: 'Email',
    rules: { ...email('Email không đúng') },
    sx: formItemSx,
  }),
  field({
    name: 'Address',
    inputType: 'text',
    label: 'Địa chỉ',
    sx: formItemSx,
    componentProps: { multiline: true, rows: 3 },
  }),
];
field({
  name: 'Contact',
  fields: subFields,
})`,
    }),
  ],
});
