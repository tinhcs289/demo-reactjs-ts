import PATHS from '@/constants/paths';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';
import type { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
export default function ButtonLogout() {
  const navigate = useNavigate();
  const handleClickLogout: MouseEventHandler<HTMLButtonElement> = (event) => {
    event?.stopPropagation?.();
    event?.preventDefault?.();
    navigate(PATHS.logout);
  };
  return (
    <IconButton color="inherit" onClick={handleClickLogout}>
      <ExitToAppIcon />
    </IconButton>
  );
}
