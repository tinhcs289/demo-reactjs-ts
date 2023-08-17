import { field, formItemSx } from '@/components/form';
import withComponentExplainDoc from '../hocs/withComponentExplainDoc';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
export const fieldToggle = field({
  name: 'Toggle',
  inputType: 'toggle',
  label: 'Input dạng lựa chọn giá trị bằng phím bấm (Toggle single)',
  md: 3,
  sx: formItemSx,
  componentProps: {
    fullWidth: true,
    options: [
      { value: 'bold', label: 'Đậm', startIcon: FormatBoldIcon },
      { value: 'italic', label: 'Nghiêng', startIcon: FormatItalicIcon },
      { value: 'underlined', label: 'Gạch dưới', startIcon: FormatUnderlinedIcon },
      { value: 'color', icon: FormatColorFillIcon, disabled: true },
    ],
  },
  gridFieldHocs: [
    withComponentExplainDoc({
      fieldName: 'Toggle',
      codeExample: `import { field, formItemSx } from '@/components/form';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
field({
name: 'Toggle',
inputType: 'toggle',
label: 'Input dạng lựa chọn giá trị bằng phím bấm (Toggle single)',
md: 3,
sx: fieldSx,
componentProps: {
  fullWidth: true,
  options: [
    { value: 'bold', label: 'Đậm', startIcon: FormatBoldIcon },
    { value: 'italic', label: 'Nghiêng', startIcon: FormatItalicIcon },
    { value: 'underlined', label: 'Gạch dưới', startIcon: FormatUnderlinedIcon },
    { value: 'color', icon: FormatColorFillIcon, disabled: true },
  ],
},
}),`,
    }),
  ],
});
