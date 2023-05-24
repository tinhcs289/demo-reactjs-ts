import { GridContainer, GridItemPaper } from '@/components/grid';
import wait from '@/functions/wait';
import { lazy } from 'react';
const DashboardTabsContainer = lazy(() => wait(0).then(() => import('@/containers/DashboardTabsContainer')));
const FormDemo1 = lazy(() =>
  wait(0).then(() => import('@/modules/FormDemo').then((_) => ({ default: _.FormDemo1 })))
);
export default function DemoFormPage() {
  return (
    <DashboardTabsContainer>
      <GridContainer fullWidth>
        <GridItemPaper sx={{ mb: 2 }}>
          <FormDemo1 />
        </GridItemPaper>
      </GridContainer>
    </DashboardTabsContainer>
  );
}
