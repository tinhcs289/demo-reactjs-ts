import { styled } from '@mui/material';
import type { LinearProgressProps } from '@mui/material/LinearProgress';
import LinearProgress from '@mui/material/LinearProgress';
const LinearProgressStyled = styled(LinearProgress)<LinearProgressProps>(({ theme }) => ({
  position: 'sticky',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: theme.zIndex.modal + 2,
}));
export default function LoadingBar() {
  return <LinearProgressStyled color="primary" />;
}
