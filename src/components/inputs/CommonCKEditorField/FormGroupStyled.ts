import type { CommonFormGroupProps } from '@/components/formGroup';
import { CommonFormGroup } from '@/components/formGroup';
import { styled } from '@mui/material';
const FormGroupStyled = styled(CommonFormGroup)<CommonFormGroupProps>({
  display: 'flex',
  '> label.MuiFormLabel-root': {
    transform: 'translate(0px, -12px) scale(0.75) !important',
  },
  '& .ck.ck-editor': {
    width: '100%',
    marginTop: '12px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    '& .ck ck-editor__top': {
      flex: 0,
    },
    '& .ck-editor__main': {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      '& .ck-content.ck-editor__editable': {
        flex: 1,
      },
    },
  },
});

export default FormGroupStyled;
