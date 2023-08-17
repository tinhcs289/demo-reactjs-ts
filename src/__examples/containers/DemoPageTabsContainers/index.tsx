import asideMenuItems from '@/__examples/constants/asideMenuItems';
import NavTabs from '@/components/nav/NavTabs';
import { DashboardPageContainer } from '@/layouts/DashboardLayout';
import type { ReactNode } from 'react';
const dataTabs = asideMenuItems[0].childs || [];
export default function DemoPageTabsContainers(props: { children?: ReactNode }) {
  const { children } = props;
  return (
    <>
      <NavTabs dataTabs={dataTabs} stickyTop />
      <DashboardPageContainer>{children}</DashboardPageContainer>
    </>
  );
}
