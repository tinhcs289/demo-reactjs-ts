import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import type { MouseEventHandler } from 'react';
export default function TopbarNotifyDisplay() {
  const handleClickLogout: MouseEventHandler<HTMLButtonElement> = (event) => {
    event?.stopPropagation?.();
  };
  return (
    <IconButton color="inherit" onClick={handleClickLogout}>
      <NotificationsIcon />
    </IconButton>
  );
}
