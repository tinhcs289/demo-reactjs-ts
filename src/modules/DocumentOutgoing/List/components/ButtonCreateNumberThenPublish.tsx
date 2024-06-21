import { ButtonCommonProps, ButtonPositive } from '@/components/buttons';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { useCallback } from 'react';
export default function ButtonCreateNumberThenPublish() {
  const handleClick: Required<ButtonCommonProps>['onClick'] = useCallback((event) => {
    event?.stopPropagation?.();
  }, []);
  return (
    <ButtonPositive startIcon={<FormatListNumberedIcon />} onClick={handleClick} noWrap>
      {`Cấp số và ban hành`}
    </ButtonPositive>
  );
}
