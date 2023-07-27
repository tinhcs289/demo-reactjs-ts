import { styled } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type { ComponentType } from 'react';
export type ButtonCommonProps = ButtonProps & { noTextTransform?: boolean; noWrap?: boolean };
const ButtonCommon: ComponentType<ButtonCommonProps> = styled(Button, {
  shouldForwardProp: (p) => p !== 'noTextTransform' && p !== 'noWrap',
})<ButtonCommonProps>(({ noTextTransform, noWrap }) => ({
  ...(!!noTextTransform ? { textTransform: 'none' } : {}),
  ...(!!noWrap ? { whiteSpace: 'nowrap' } : {}),
}));
export default ButtonCommon;
