import type { TBodyCellInnerComponent } from '@/components/CommonTable/_types';
import momentOrDefault from '@/helpers/formatHelpers/momentOrDefault';
import type { TAny } from '@/_types/TAny';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import type { TOrderListItem } from '../_types';

const DateUsed: TBodyCellInnerComponent<TOrderListItem, TAny> = ({ row }) => {
  const startDate = useMemo(() => {
    const date = momentOrDefault(row?.startDate);
    if (!date) return 'thời điểm không xác định';
    return (
      <Typography noWrap color="GrayText">
        <b>{date.format('HH:mm')}</b>
        {`,`}&nbsp;{date.format('DD/MM/YYYY')}
      </Typography>
    );
  }, [row?.startDate]);

  return startDate as any;
};
export default DateUsed;
