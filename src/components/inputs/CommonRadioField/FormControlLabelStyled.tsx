import { styled } from '@mui/material';
import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
const FormControlLabelStyled = styled(FormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  width: '100%',
  marginRight: 0,
  marginLeft: 0,
  minHeight: '42px',
  background: theme.palette.mode === 'light' ? theme.palette.action.hover : theme.palette.background.default,
  '&:hover': {
    background: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
  },
  '& span.MuiButtonBase-root.MuiRadio-root': {
    marginBottom: '0 !important',
  },
}));
export default FormControlLabelStyled;
