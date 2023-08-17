import { GridContainer, GridItemPaper } from '@/components/grid';
import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
const PageTabsContainer = lazy(() =>
  wait().then(() => import('@/__examples/containers/DemoPageTabsContainers'))
);
const HowToDefinedForm = lazy(() => wait().then(() => import('./HowToDefinedForm')));
const FormDemo = lazy(() => wait().then(() => import('./FormDemo')));
export default function DemoFormPage() {
  return (
    <PageTabsContainer>
      <GridContainer fullWidth>
        <GridItemPaper mb={2}>
          <HowToDefinedForm />
        </GridItemPaper>
        <GridItemPaper>
          <FormDemo />
        </GridItemPaper>
      </GridContainer>
    </PageTabsContainer>
  );
}
