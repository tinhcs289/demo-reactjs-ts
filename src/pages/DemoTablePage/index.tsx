import { GridContainer, GridItem } from '@/components/grid';
import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
const DashboardTabsContainer = lazy(() => wait().then(() => import('@/containers/DashboardTabsContainer')));
const Table = lazy(() => wait().then(() => import('@/modules/TableDocumentIncomming')));
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
