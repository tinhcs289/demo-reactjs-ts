import { createCellInnerComponent } from '@/components/table';
import { getStatusByValue } from '@/constants/document';
import { styled } from '@mui/material';
import type { ChipProps } from '@mui/material/Chip';
import Chip from '@mui/material/Chip';
import { useMemo } from 'react';
import type { RowData } from '../_types';
const ChipStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  borderRadius: theme.spacing(0.5),
}));
const CellStatus = createCellInnerComponent<RowData>(function Status(props) {
  const { row } = props;
  const text = useMemo(() => getStatusByValue(row?.MaTrangThai)?.text || 'N/A', [row?.MaTrangThai]);
  return <ChipStyled label={text} size="small" />;
});
export default CellStatus;
