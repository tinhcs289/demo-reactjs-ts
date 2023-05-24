import { styled } from '@mui/material';
import type { FormLabelProps } from '@mui/material/FormLabel';
import FormLabel from '@mui/material/FormLabel';
const FormLabelStyled = styled(FormLabel, {
  shouldForwardProp: p => p !== 'inputType'
})<FormLabelProps & { inputType: 'checkgroup' | 'radiogroup' | 'switchgroup' | 'toggle' }>(({ theme, inputType }) => ({
  display: 'inherit',
  left: '-12px',
  marginBottom: '4px',
  ...(() => {
    if (inputType === 'checkgroup' || inputType === 'radiogroup' || inputType === 'switchgroup')
      return {
        transform: 'translate(-14px, -14px) scale(0.75) !important',
      }
    if (inputType === 'toggle') return {
      transform: 'translate(-6px, -14px) scale(0.75) !important',
    }
    return {
      transform: 'translate(14px, -9px) scale(0.75) !important',
    }
  })(),

}));
export default FormLabelStyled;