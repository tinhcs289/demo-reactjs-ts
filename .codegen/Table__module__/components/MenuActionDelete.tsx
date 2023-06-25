//@ts-nocheck --entire-file
import { createMenuActionItem } from '@/components/table';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { RowData } from '../_types';
import { useAsyncListAction } from '../context';
const MenuActionDelete = createMenuActionItem<RowData>(function DeleteItem(props) {
  const { props: otherProps } = props;
  const { t } = useTranslation();
  const { setAction } = useAsyncListAction();
  const handleClick = useCallback(() => {
    setAction?.({ action: 'DELETE', keepInteract: true });
  }, [setAction]);
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
