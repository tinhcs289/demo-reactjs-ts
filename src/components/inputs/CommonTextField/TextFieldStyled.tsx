import { inputLabelStyles } from '@/components/formGroup';
import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import omit from 'lodash/omit';
const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& div.MuiInputBase-root': {
    background: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800],
  },
  '& label.MuiFormLabel-root.MuiInputLabel-root': {
    ...omit(inputLabelStyles(theme), 'transform'),
  },
}));
export default TextFieldStyled;
