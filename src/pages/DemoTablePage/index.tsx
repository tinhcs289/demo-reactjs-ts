import { GridContainer, GridItem } from '@/components/grid';
import wait from '@/functions/wait';
import { lazy } from 'react';
const DashboardTabsContainer = lazy(() => wait(0).then(() => import('@/containers/DashboardTabsContainer')));
const TableOrders = lazy(() => wait(0).then(() => import('@/modules/TableOrders')));
const TableShopeeProduct = lazy(() => wait(0).then(() => import('@/modules/TableShopeeProduct')));
export default function DemoTablePage() {
  return (
    <DashboardTabsContainer>
      <GridContainer>
        <GridItem md={6} sx={{ p: 2 }}>
          <TableShopeeProduct />
        </GridItem>
        <GridItem md={6} sx={{ p: 2 }}>
          <TableOrders />
        </GridItem>
      </GridContainer>
    </DashboardTabsContainer>
  );
}
