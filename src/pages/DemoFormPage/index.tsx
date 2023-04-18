import { GridContainer, GridItemPaper } from '@/components/grid';
import wait from '@/functions/wait';
import { defaultContact } from '@/modules/FormContact/constants';
import { lazy } from 'react';
const DashboardTabsContainer = lazy(() => wait(0).then(() => import('@/containers/DashboardTabsContainer')));
const FormContact = lazy(() => wait(0).then(() => import('@/modules/FormContact')));
const FormDemo1 = lazy(() =>
  wait(0).then(() => import('@/modules/FormDemo').then((_) => ({ default: _.FormDemo1 })))
);
const FormDemo2 = lazy(() =>
  wait(0).then(() => import('@/modules/FormDemo').then((_) => ({ default: _.FormDemo2 })))
);
export default function DemoFormPage() {
  return (
    <DashboardTabsContainer>
      <GridContainer fullWidth>
        <GridItemPaper lg={6} sx={{ mb: 2 }}>
          <FormContact defaultValues={defaultContact} />
        </GridItemPaper>
        <GridItemPaper sx={{ mb: 2 }}>
          <FormDemo1 />
        </GridItemPaper>
        <GridItemPaper sx={{ mb: 2 }}>
          <FormDemo2 />
        </GridItemPaper>
      </GridContainer>
    </DashboardTabsContainer>
  );
}
