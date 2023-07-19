import { GridContainer, GridItemPaper } from '@/components/grid';
import wait from '@/functions/wait';
import { lazy } from 'react';
const DashboardTabsContainer = lazy(() => wait(0).then(() => import('@/containers/DashboardTabsContainer')));
const Form = lazy(() => wait(0).then(() => import('@/modules/FormDocumentIncomming')));
// const FormFilterDemo = lazy(() => wait(0).then(() => import('@/modules/FormFilterDemo')));
export default function DemoFormPage() {
  return (
    <DashboardTabsContainer>
      <GridContainer fullWidth>
        {/* <GridItemPaper sx={{ mb: 2 }}>
          <FormFilterDemo />
        </GridItemPaper> */}
        <GridItemPaper sx={{ mb: 2 }}>
          <Form defaultValues={{ SelectBooleanField: true }} />
        </GridItemPaper>
      </GridContainer>
    </DashboardTabsContainer>
  );
}
