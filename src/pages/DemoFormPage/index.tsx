import { GridContainer, GridItemPaper } from '@/components/grid';
import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
const DashboardTabsContainer = lazy(() => wait().then(() => import('@/containers/DashboardTabsContainer')));
const Form = lazy(() => wait().then(() => import('@/modules/FormDocumentIncomming')));
// const FormFilterDemo = lazy(() => wait().then(() => import('@/modules/FormFilterDemo')));
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
