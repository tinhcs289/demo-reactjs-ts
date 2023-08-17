import wait from '@/helpers/asyncHelpers/wait';
import { lazy } from 'react';
const TabsContainer = lazy(() => wait().then(() => import('@/containers/DocumentIncommingTabsContainer')));
const List = lazy(() => wait().then(() => import('@/modules/DocumentIncoming/List')));
export default function DocumentIncomingListPage() {
  return (
    <TabsContainer>
      <List />
    </TabsContainer>
  );
}
