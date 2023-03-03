import { styled } from '@mui/material/styles';
import type { TabsProps } from '@mui/material/Tabs';
import Tabs from '@mui/material/Tabs';

const TabsStyled = styled(Tabs,
  {
    shouldForwardProp: prop => prop !== 'stickyTop',
  })<TabsProps & { stickyTop?: boolean }>(({ theme, stickyTop }) => ({
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    ...(stickyTop ? {
      position: 'sticky',
      left: 0,
      top: 0,
      background: theme.palette.background.paper,
      zIndex: theme.zIndex.drawer,
      width: '100%',
    } : {}),
  }));
export default TabsStyled;