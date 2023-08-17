import NavTabs from '@/components/nav/NavTabs';
import asideMenuItems from '@/constants/asideMenuItems.qlvb';
import { DashboardPageContainer } from '@/layouts/DashboardLayout';
import type { ReactNode } from 'react';
const dataTabs = asideMenuItems[0].childs || [];
export default function DocumentIncommingTabsContainer(props: { children?: ReactNode }) {
  const { children } = props;
  return (
    <>
      <NavTabs dataTabs={dataTabs} stickyTop />
      <DashboardPageContainer>{children}</DashboardPageContainer>
    </>
  );
}
