import type { BackdropProps } from '@mui/material/Backdrop';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import type { ComponentType } from 'react';

const CommonFallback: ComponentType<Omit<BackdropProps, 'open'> & { icon?: JSX.Element }> = (props) => {
  const { icon, sx, ...otherProps } = props;
  return (
    <Backdrop open {...otherProps} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, ...sx }}>
      {icon || <CircularProgress color="inherit" />}
    </Backdrop>
  );
};
export default CommonFallback;
