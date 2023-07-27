import { GridContainer, GridItem } from '@/components/grid';
import wait from '@/functions/wait';
import { lazy } from 'react';
const DashboardTabsContainer = lazy(() => wait(0).then(() => import('@/containers/DashboardTabsContainer')));
const Table = lazy(() => wait(0).then(() => import('@/modules/TableDocumentIncomming')));
export default function DemoTablePage() {
  return (
    <DashboardTabsContainer>
      <GridContainer fullHeight>
        <GridItem contentProps={{ flexDirection: 'column' }}>
          <Table />
        </GridItem>
      </GridContainer>
    </DashboardTabsContainer>
  );
}
