import NavTabs from '@/components/NavTabs';
import asideMenuItems from '@/constants/asideMenuItems';
import { DashboardPageContainer } from '@/layouts/DashboardLayout';
import type { ComponentType, ReactNode } from 'react';

const dataTabs = asideMenuItems[0].childs || [];
function DashboardTabsContainer(props: { children?: ReactNode }) {
  const { children } = props;
  return (
    <>
      <NavTabs dataTabs={dataTabs} stickyTop />
      <DashboardPageContainer>{children}</DashboardPageContainer>
    </>
  );
}
export default DashboardTabsContainer as ComponentType<any>;
