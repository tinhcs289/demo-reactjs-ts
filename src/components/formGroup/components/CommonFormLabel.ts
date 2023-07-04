import { styled } from '@mui/material';
import type { FormLabelProps } from '@mui/material/FormLabel';
import FormLabel from '@mui/material/FormLabel';
import type { ComponentType } from 'react';
export type CommonFormLabelProps = FormLabelProps & {
  inputType: 'checkgroup' | 'radiogroup' | 'switchgroup' | 'toggle';
  disableTransform?: boolean;
};
const CommonFormLabel = styled(FormLabel, {
  shouldForwardProp: (p) => p !== 'inputType' && p !== 'disableTransform',
})<CommonFormLabelProps>(({ inputType, disableTransform }) => ({
  display: 'inherit',
  left: !disableTransform ? '-12px' : 0,
  marginBottom: '4px',
  ...(() => {
    if (disableTransform)
      return {
        transform: 'translate(-18px, -9px) scale(0.75) !important',
      };
    if (inputType === 'checkgroup' || inputType === 'radiogroup' || inputType === 'switchgroup')
      return {
        transform: 'translate(-14px, -14px) scale(0.75) !important',
      };
    if (inputType === 'toggle')
      return {
        transform: 'translate(-6px, -14px) scale(0.75) !important',
      };
    return {
      transform: 'translate(14px, -9px) scale(0.75) !important',
    };
  })(),
})) as ComponentType<CommonFormLabelProps>;
export default CommonFormLabel;
