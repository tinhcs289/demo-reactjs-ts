import { styled } from '@mui/material';
import type { FormLabelProps } from '@mui/material/FormLabel';
import FormLabel from '@mui/material/FormLabel';
import type { ComponentType } from 'react';
export type CommonFormLabelProps = FormLabelProps & {
  inputType: 'checkgroup' | 'radiogroup' | 'switchgroup' | 'toggle';
  disableFloatingLabel?: boolean;
};
const CommonFormLabel = styled(FormLabel, {
  shouldForwardProp: (p) => p !== 'inputType' && p !== 'disableFloatingLabel',
})<CommonFormLabelProps>(({ inputType: _, disableFloatingLabel }) => ({
  display: 'inherit',
  left: !disableFloatingLabel ? '-12px' : 0,
  marginBottom: '4px',
  ...(() => {
    if (disableFloatingLabel)
      return {
        fontSize: '0.75rem !important',
        transform: 'none !important',
        marginTop: '-9px',
      };
    // some input has transform
    // if (inputType === 'checkgroup' || inputType === 'radiogroup' || inputType === 'switchgroup')
    //   return {
    //     transform: 'translate(-14px, -14px) scale(0.75) !important',
    //   };
    // if (inputType === 'toggle')
    //   return {
    //     transform: 'translate(-6px, -14px) scale(0.75) !important',
    //   };
    // return {
    //   transform: 'translate(14px, -9px) scale(0.75) !important',
    // };
  })(),
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})) as ComponentType<CommonFormLabelProps>;
export default CommonFormLabel;
