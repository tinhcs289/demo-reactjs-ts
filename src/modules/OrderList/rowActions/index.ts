import type { TItemMenuAction } from '@/components/CommonTable';
import { menuActions, renderItemAs } from '@/components/CommonTable';
import PATHS  from '@/constants/paths';
import { i18n } from '@/translation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AsyncListItemActionMenuDelete, AsyncListItemActionMenuEdit } from '../context';
import type { TOrderListItem } from '../_types';
const rowActions: TItemMenuAction<TOrderListItem>[] = menuActions<TOrderListItem>([
  { label: i18n.t('common:edit'), icon: EditIcon, render: renderItemAs(AsyncListItemActionMenuEdit) },
  { label: i18n.t('common:delete'), icon: DeleteIcon, render: renderItemAs(AsyncListItemActionMenuDelete) },
  { type: 'divider' },
  { label: 'Navigate to somewhere', icon: ArrowForwardIcon, to: PATHS.demoForm },
]);
export default rowActions;
