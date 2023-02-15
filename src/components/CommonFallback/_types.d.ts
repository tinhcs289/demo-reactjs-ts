import type { BackdropProps } from '@mui/material/Backdrop';
export type TCommonFallbackProps = Omit<BackdropProps, 'open'> & { icon?: JSX.Element };
