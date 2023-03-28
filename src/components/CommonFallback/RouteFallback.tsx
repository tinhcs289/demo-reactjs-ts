import type { BackdropProps } from '@mui/material/Backdrop';
import FallBackAbsolute from './FallBackAbsolute';
export type RouteFallbackProps = Omit<BackdropProps, 'open'>;
export default function RouteFallback(props: RouteFallbackProps) {
  return <FallBackAbsolute {...props} open />;
}
