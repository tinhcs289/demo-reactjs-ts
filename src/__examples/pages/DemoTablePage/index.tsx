import { GridContainer, GridItem } from '@/components/grid';
import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
const PageTabsContainer = lazy(() =>
  wait().then(() => import('@/__examples/containers/DemoPageTabsContainers'))
);
const TableList = lazy(() => wait().then(() => import('@/__examples/modules/Orders/List')));
export default function DemoTablePage() {
  return (
    <PageTabsContainer>
      <GridContainer fullHeight>
        <GridItem contentProps={{ flexDirection: 'column' }}>
          <TableList />
        </GridItem>
      </GridContainer>
    </PageTabsContainer>
  );
}
