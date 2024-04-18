import PATHS from '@/constants/paths';
import { environmentIs } from '@/environments/getEnvironmentName';
import { menuItem } from '@/helpers/asideMenuHelpers';
import toLink from '@/helpers/routerHelpers/toLink';
import type { TAsideMenuItem } from '@/layouts/DashboardLayout';
import { DOCUMENT_STATUS as DOCUMENT_INCOMING_STATUS } from '@/modules/DocumentIncoming/constants';
import { DOCUMENT_STATUS as DOCUMENT_OUTGOING_STATUS } from '@/modules/DocumentOutgoing/constants';
import InboxIcon from '@mui/icons-material/Inbox';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
const linksByStatusIncoming = Object.keys(DOCUMENT_INCOMING_STATUS).reduce((childs, key, _keys) => {
  const status = DOCUMENT_INCOMING_STATUS[key as keyof typeof DOCUMENT_INCOMING_STATUS];
  const url = toLink(PATHS.documentIncomingList, { documentStatus: status.value });
  return [
    ...childs,
    menuItem({
      label: status.text,
      labelText: status.text,
      url: url,
      icon: InboxIcon,
    }),
  ];
}, [] as TAsideMenuItem[]);
const linksByStatusOutgoing = Object.keys(DOCUMENT_OUTGOING_STATUS).reduce((childs, key, _keys) => {
  const status = DOCUMENT_OUTGOING_STATUS[key as keyof typeof DOCUMENT_OUTGOING_STATUS];
  const url = toLink(PATHS.documentOutgoingList, { documentStatus: status.value });
  return [
    ...childs,
    menuItem({
      label: status.text,
      labelText: status.text,
      url: url,
      icon: InboxIcon,
    }),
  ];
}, [] as TAsideMenuItem[]);
const asideMenuItems_qlvb: TAsideMenuItem[] = environmentIs.qlvb()
  ? [
      menuItem({
        label: 'Văn bản đến',
        labelText: 'Văn bản đến',
        type: 'link',
        icon: LoginIcon,
        url: PATHS.documentIncoming,
        childs: linksByStatusIncoming,
      }),
      menuItem({
        label: 'Văn bản đi',
        labelText: 'Văn bản đi',
        type: 'link',
        icon: LogoutIcon,
        url: PATHS.documentOutgoing,
        childs: linksByStatusOutgoing,
      }),
    ]
  : [];
export default asideMenuItems_qlvb;
