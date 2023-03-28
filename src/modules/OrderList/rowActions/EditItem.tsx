import type { TItemMenuActionComponent } from '@/components/CommonTable';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useMemo } from 'react';
import { useAsyncListAction } from '../context';
import type { TOrderListItem } from '../_types';
const EditItem: TItemMenuActionComponent<TOrderListItem> = (props) => {
  const { icon, label, props: otherProps } = props;
  const { setAction } = useAsyncListAction();
  const handleClick = useCallback(() => {
    setAction?.({ action: 'OPEN_DETAIL', keepInteract: true });
  }, [setAction]);
  const $Icon = useMemo(() => icon?.() || null, [icon]);
  const $Label = useMemo(() => label?.() || null, [label]);
  const $Return = useMemo(() => {
    return (
      <MenuItem {...(otherProps as any)} onClick={handleClick}>
        {$Icon}
        {$Label}
      </MenuItem>
    );
  }, [$Icon, $Label, handleClick, otherProps]);
  return $Return;
};
export default EditItem;
