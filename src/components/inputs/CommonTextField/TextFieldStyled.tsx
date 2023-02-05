import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& div.MuiInputBase-root': {
    // paddingRight: `${theme.spacing(0.5)} !important`,
  },
}));
export default TextFieldStyled;
