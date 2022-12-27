import OrderList from '@/modules/OrderList';
import Box from '@mui/material/Box';
import type { FC } from 'react';

const DashboardPage: FC<any> = () => {
  return (
    <Box sx={{ m: 0, p: 0 }}>
      <OrderList />
    </Box>
  );
};
export default DashboardPage;
