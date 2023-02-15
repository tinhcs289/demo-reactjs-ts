import type { TItemMenuActionComponent } from '@/components/CommonTable';
import { ACTION } from '@/hooks/useAsyncListState';
import type { TAny } from '@/types';
import MenuItem from '@mui/material/MenuItem';
import { useCallback } from 'react';
import { useAsyncList } from '../context';
import type { T__module__ListItem } from '../_types';

const EditItem: TItemMenuActionComponent<T__module__ListItem, TAny> = (props) => {
  const { icon, label, props: otherProps } = props;
  const [set] = useAsyncList((s) => s?.action?.set);

  const handleClick = useCallback(() => {
    set?.({
      action: ACTION.OPEN_DETAIL,
      keepInteract: true,
    });
  }, [set]);

  return (
    <MenuItem {...(otherProps as any)} onClick={handleClick}>
      {icon()}
      {label()}
    </MenuItem>
  );
};
export default EditItem;
