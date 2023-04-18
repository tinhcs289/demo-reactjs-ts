import { createMenuActionItem } from '@/components/table';
import EditIcon from '@mui/icons-material/Edit';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { RowData } from '../_types';
import { useAsyncListAction } from '../context';
const MenuActionOpenDetail = createMenuActionItem<RowData>(function EditItem(props) {
  const { props: otherProps } = props;
  const { t } = useTranslation();
  const { setAction } = useAsyncListAction();
  const handleClick = useCallback(() => {
    setAction?.({ action: 'OPEN_DETAIL', keepInteract: true });
  }, [setAction]);
  return (
    <MenuItem {...(otherProps as any)} onClick={handleClick}>
      <ListItemIcon>
        <EditIcon />
      </ListItemIcon>
      <ListItemText primary={t('common:edit')} primaryTypographyProps={{ noWrap: true }} />
    </MenuItem>
  );
});
export default MenuActionOpenDetail;
