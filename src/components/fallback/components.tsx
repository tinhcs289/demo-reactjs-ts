import { styled } from '@mui/material';
import type { BackdropProps } from '@mui/material/Backdrop';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
export type CommonFallbackProps = Omit<BackdropProps, 'open'> & { icon?: JSX.Element };
export function CommonFallback(props: CommonFallbackProps) {
  const { icon, sx, ...otherProps } = props;
  return (
    <Backdrop open {...otherProps} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, ...sx }}>
      {icon || <CircularProgress color="inherit" />}
    </Backdrop>
  );
}
export const AbsoluteFallBack = styled(Backdrop)<BackdropProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  position: 'absolute',
}));
const RouteFallbackStyled = styled(AbsoluteFallBack)<BackdropProps>(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
}));
export type RouteFallbackProps = Omit<BackdropProps, 'open'>;
export function RouteFallback(props: RouteFallbackProps) {
  return <RouteFallbackStyled {...props} open />;
}
