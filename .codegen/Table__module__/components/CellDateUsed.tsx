import { createCellInnerComponent } from '@/components/table';
import momentOrDefault from '@/helpers/formatHelpers/momentOrDefault';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import type { RowData } from '../_types';
const CellDateUsed = createCellInnerComponent<RowData>(function DateUsed(props) {
  const { row } = props;
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
});
export default CellDateUsed;
