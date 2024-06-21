import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
const TabsContainer = lazy(() => wait().then(() => import('@/containers/DocumentOutgoingTabsContainer')));
const List = lazy(() => wait().then(() => import('@/modules/DocumentOutgoing/List')));
export default function DocumentOutgoingListPage() {
  return (
    <TabsContainer>
      <List />
    </TabsContainer>
  );
}
