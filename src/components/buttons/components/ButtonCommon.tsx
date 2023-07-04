import { styled } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type { ComponentType } from 'react';
export type ButtonCommonProps = ButtonProps & { noTextTransform?: boolean };
const ButtonCommon: ComponentType<ButtonCommonProps> = styled(Button, {
  shouldForwardProp: (p) => p !== 'noTextTransform',
})<ButtonCommonProps>(({ noTextTransform }) => ({
  ...(!!noTextTransform ? { textTransform: 'none' } : {}),
}));
export default ButtonCommon;
