import type { ButtonCommonProps } from '@/components/buttons';
import { ButtonPositive } from '@/components/buttons';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { useCallback } from 'react';
export default function ButtonCreateNumberThenHold() {
  const handleClick: Required<ButtonCommonProps>['onClick'] = useCallback((event) => {
    event?.stopPropagation?.();
  }, []);
  return (
    <ButtonPositive startIcon={<FormatListNumberedIcon />} onClick={handleClick} noWrap>
      {`Giữ số`}
    </ButtonPositive>
  );
}
