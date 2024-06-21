import { createMenuActionItem } from '@/components/table';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import type { MouseEventHandler } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MUTATE_ACTION } from '../../constants';
import type { RowData } from '../_types';
import { useAsyncListAction } from '../context';
const ACTION = MUTATE_ACTION.DELETE;
const MenuActionDelete = createMenuActionItem<RowData>(function DeleteItem(props) {
  const { props: otherProps } = props;
  const { t } = useTranslation();
  const { setAction } = useAsyncListAction();
  const handleClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (event) => {
      event?.stopPropagation?.();
      setAction?.({ action: ACTION, keepInteract: true });
      return;
    },
    [setAction]
  );
  return (
    <MenuItem {...(otherProps as any)} onClick={handleClick}>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary={t('common:delete')} primaryTypographyProps={{ noWrap: true }} />
    </MenuItem>
  );
});
export default MenuActionDelete;
