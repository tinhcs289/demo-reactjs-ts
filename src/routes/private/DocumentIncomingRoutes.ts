import PATHS from '@/constants/paths';
import wait from '@/helpers/asyncHelpers/wait';
import toLink from '@/helpers/routerHelpers/toLink';
import { DOCUMENT_STATUS } from '@/modules/DocumentIncoming/constants';
import type { RouteConfig } from '@/routes/_types';
import { lazy } from 'react';
const Content404 = lazy(() => wait().then(() => import('@/modules/Content404')));
const ListPage = lazy(() => wait().then(() => import('@/pages/DocumentIncomingListPage')));
const moduleName = 'DocumentIncoming';
const DocumentIncomingRoutes: RouteConfig[] = [
  {
    name: `${moduleName}ListRoute`,
    path: PATHS.documentIncomingList,
    component: ListPage,
  },
  {
    name: `${moduleName}Route`,
    path: PATHS.documentIncoming,
    navigateTo: toLink(PATHS.documentIncomingList, {
      documentStatus: DOCUMENT_STATUS.PENDING_RECORDED.value,
    }),
  },
  {
    name: `${moduleName}NotFoundRoute`,
    path: PATHS.documentIncoming + '/*',
    component: Content404,
  },
];
export default DocumentIncomingRoutes;
