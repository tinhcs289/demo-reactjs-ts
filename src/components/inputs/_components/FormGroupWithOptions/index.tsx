import type { FormGroupProps } from '@mui/material/FormGroup';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material';
import type { Theme } from '@mui/material';
export function optionBackground(theme: Theme) {
  return {
    borderRadius: theme.spacing(0.5),
    background:
      theme.palette.mode === 'light' ? theme.palette.action.hover : theme.palette.background.default,
    '&:hover': {
      background: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
    },
  };
}
export function inputLabelStyles(theme?: Theme) {
  return {
    fontWeight: '400',
    fontSize: '1rem',
    lineHeight: '1.4375em',
    letterSpacing: '0.00938em',
    transform: 'translate(-48px, 0px) scale(0.75)',
  };
}
const FormGroupWithOptions = styled(FormGroup)<FormGroupProps>(({ theme }) => ({
  position: 'relative',
  fontSize: theme.spacing(2),
  '& > legen.MuiFormLabel-root': {
    marginBottom: theme.spacing(0.5),
  },
  '& > label.MuiFormLabel-root': {
    position: 'absolute',
    top: 0,
    // the same styles as TextField
    ...inputLabelStyles(theme),
  },
  '& label.MuiFormControlLabel-root': {
    marginRight: 0,
    marginLeft: 0,
    minHeight: '42px',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(0.25),
    },
    ...optionBackground(theme),
    '& > span:first-of-type': {
      alignSelf: 'flex-start',
    },
  },
}));
export default FormGroupWithOptions;
