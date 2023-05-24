import { styled } from '@mui/material';
import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import { optionBackground } from '@/components/inputs/_components/FormGroupWithOptions';
const FormControlLabelStyled = styled(FormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  width: '100%',
  marginRight: 0,
  marginLeft: 0,
  minHeight: '42px',
  ...optionBackground(theme),
  '& span.MuiSwitch-root': {
    marginBottom: '0 !important',
  },
}));
export default FormControlLabelStyled;
