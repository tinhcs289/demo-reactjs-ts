import NavTabs from '@/components/nav/NavTabs';
import asideMenuItems from '@/constants/asideMenuItems.qlvb';
import { DashboardPageContainer } from '@/layouts/DashboardLayout';
import type { ReactNode } from 'react';
const dataTabs = asideMenuItems[1].childs || [];
export default function DocumentOutgoingTabsContainer(props: { children?: ReactNode }) {
  const { children } = props;
  return (
    <>
      <NavTabs dataTabs={dataTabs} stickyTop />
      <DashboardPageContainer>{children}</DashboardPageContainer>
    </>
  );
}