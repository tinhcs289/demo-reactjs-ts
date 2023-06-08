import ToggleButton from '@mui/material/ToggleButton';
import { ToggleButtonProps } from '@mui/material/ToggleButton';
import { styled } from '@mui/material';
const ToggleButtonStyled = styled(ToggleButton)<ToggleButtonProps>({
  // keep all buttons on the same line by not setting left-right padding.
  paddingLeft: 0,
  paddingRight: 0,
  // keep text ellipsis
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
export default ToggleButtonStyled;