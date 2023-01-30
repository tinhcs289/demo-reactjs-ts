import PATHS from '@/routes/paths';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';
import type { FC, MouseEventHandler } from 'react';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonLogout: FC<any> = (props) => {
  const navigate = useNavigate();

  const handleClickLogout: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      event?.preventDefault?.();
      navigate(PATHS.logout);
    },
    [navigate]
  );

  return (
    <IconButton color="inherit" onClick={handleClickLogout}>
      <ExitToAppIcon />
    </IconButton>
  );
};
export default memo(ButtonLogout) as FC<any>;
