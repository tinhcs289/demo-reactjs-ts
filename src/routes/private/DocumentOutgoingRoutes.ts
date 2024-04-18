import PATHS from '@/constants/paths';
import wait from '@/helpers/asyncHelpers/wait';
import toLink from '@/helpers/routerHelpers/toLink';
import { DOCUMENT_STATUS } from '@/modules/DocumentOutgoing/constants';
import type { RouteConfig } from '@/routes/_types';
import { lazy } from 'react';
const Content404 = lazy(() => wait().then(() => import('@/modules/Content404')));
const ListPage = lazy(() => wait().then(() => import('@/pages/DocumentOutgoingListPage')));
const moduleName = 'DocumentOutgoing';
const DocumentOutgoingRoutes: RouteConfig[] = [
  {
    name: `${moduleName}ListRoute`,
    path: PATHS.documentOutgoingList,
    component: ListPage,
  },
  {
    name: `${moduleName}Route`,
    path: PATHS.documentOutgoing,
    navigateTo: toLink(PATHS.documentOutgoingList, {
      documentStatus: DOCUMENT_STATUS.PENDING_SIGNATURE_REQUEST.value,
    }),
  },
  {
    name: `${moduleName}NotFoundRoute`,
    path: PATHS.documentOutgoing + '/*',
    component: Content404,
  },
];
export default DocumentOutgoingRoutes;
