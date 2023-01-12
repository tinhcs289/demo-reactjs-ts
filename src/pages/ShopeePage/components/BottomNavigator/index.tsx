import LiveTvIcon from '@mui/icons-material/LiveTv';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { styled } from '@mui/material';
import type { BottomNavigationProps } from '@mui/material/BottomNavigation';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import { useState } from 'react';

const Bottom = styled(Box)<BoxProps>(({ theme }) => ({
  zIndex: theme.zIndex.appBar,
  position: 'fixed',
  bottom: 0,
  width: '100%',
  paddingBottom: theme.spacing(2),
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
}));

const Navigator = styled(BottomNavigation)<BottomNavigationProps>(({ theme }) => ({
  zIndex: theme.zIndex.appBar + 1,
  width: '100%',
  '& .MuiBottomNavigationAction-label': { fontSize: '0.85em' },
}));

export default function BottomNavigator() {
  const [value, setValue] = useState(0);

  return (
    <>
      <Box sx={{ mb: 9 }}></Box>
      <Bottom>
        <Navigator
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Gợi ý" icon={<ThumbUpAltIcon />} />
          <BottomNavigationAction label="Mall" icon={<LocalMallIcon />} />
          <BottomNavigationAction label="Live" icon={<LiveTvIcon />} />
          <BottomNavigationAction label="Thông báo" icon={<NotificationsIcon />} />
          <BottomNavigationAction label="Tôi" icon={<PersonIcon />} />
        </Navigator>
      </Bottom>
    </>
  );
}
