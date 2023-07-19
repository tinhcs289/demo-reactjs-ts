import { GridContainer, GridItem } from '@/components/grid';
import wait from '@/functions/wait';
import { lazy } from 'react';
const DashboardTabsContainer = lazy(() => wait(0).then(() => import('@/containers/DashboardTabsContainer')));
const Table = lazy(() => wait(0).then(() => import('@/modules/TableDocumentIncomming')));
export default function DemoTablePage() {
  return (
    <DashboardTabsContainer>
      <GridContainer>
        <GridItem px={1}>
          <Table />
        </GridItem>
      </GridContainer>
    </DashboardTabsContainer>
  );
}
