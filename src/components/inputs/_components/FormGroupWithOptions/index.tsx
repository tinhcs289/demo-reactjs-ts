import type { FormGroupProps } from '@mui/material/FormGroup';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material';
const FormGroupWithOptions = styled(FormGroup)<FormGroupProps>(({ theme }) => ({
  fontSize: theme.spacing(2),
  '& > legen.MuiFormLabel-root': {
    marginBottom: theme.spacing(0.5),
  },
  '& label.MuiFormControlLabel-root': {
    marginRight: 0,
    marginLeft: 0,
    minHeight: '42px',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(0.25),
    },
    background:
      theme.palette.mode === 'light' ? theme.palette.action.hover : theme.palette.background.default,
    '&:hover': {
      background: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
    },
    '& > span:first-of-type': {
      alignSelf: 'flex-start',
    },
  },
}));
export default FormGroupWithOptions;
