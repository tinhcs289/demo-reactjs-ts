import contentMaxWidth from '@/appLocalStorages/contentMaxWidth';
import { useDashboardLayout } from '@/providers/DashboardLayoutProvider';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import MonitorIcon from '@mui/icons-material/Monitor';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import type { Breakpoint } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import isEqual from 'lodash/isEqual';
import type { FC, MouseEvent } from 'react';
import { useCallback } from 'react';
import { DEFAULT_WIDTH } from './constants';

const PageWidthChange: FC<any> = (props) => {
  const [pageMaxWidth, setWidth] = useDashboardLayout((s) => s.pageMaxWidth);

  const handleChangeWidth = useCallback(
    (event: MouseEvent<HTMLElement>, value: Breakpoint) => {
      if (isEqual(pageMaxWidth, value)) return;
      setWidth({ pageMaxWidth: value || DEFAULT_WIDTH });
      contentMaxWidth.set(value || DEFAULT_WIDTH, true);
    },
    [pageMaxWidth, setWidth],
  );

  return (
    <ToggleButtonGroup
      size="small"
      color="primary"
      value={pageMaxWidth || DEFAULT_WIDTH}
      exclusive
      onChange={handleChangeWidth}
      sx={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        background: (theme) => theme.palette.background.paper,
      }}
    >
      <ToggleButton value="sm">
        <StayCurrentPortraitIcon />
      </ToggleButton>
      <ToggleButton value="md">
        <TabletMacIcon />
      </ToggleButton>
      <ToggleButton value="lg">
        <LaptopMacIcon />
      </ToggleButton>
      <ToggleButton value="xl">
        <MonitorIcon />
      </ToggleButton>
      <ToggleButton value="sx">
        <ScreenshotMonitorIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
export default PageWidthChange;
