import { styled } from '@mui/material';
import type { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import { optionBackground } from '../functions';
const CommonFormControlLabel = styled(FormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  width: '100%',
  marginRight: 0,
  marginLeft: 0,
  minHeight: '42px',
  ...optionBackground(theme),
  '& span.MuiButtonBase-root.MuiCheckbox-root': {
    marginBottom: '0 !important',
  },
  '& span.MuiSwitch-root': {
    marginBottom: '0 !important',
  },
  '& span.MuiButtonBase-root.MuiRadio-root': {
    marginBottom: '0 !important',
  },
}));
export default CommonFormControlLabel;