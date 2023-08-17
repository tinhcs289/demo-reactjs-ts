import { createCellInnerComponent } from '@/components/table';
import { getStatusByValue } from '@/modules/DocumentIncoming/functions';
import type { SxProps, Theme } from '@mui/material';
import { styled, useTheme } from '@mui/material';
import type { ChipProps } from '@mui/material/Chip';
import Chip from '@mui/material/Chip';
import { useMemo } from 'react';
import type { RowData } from '../_types';
import { STATUS } from '../constants';
const ChipStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  borderRadius: theme.spacing(0.5),
}));
type Sx = Partial<SxProps<Theme>>;
const CellStatus = createCellInnerComponent<RowData>(function Status(props) {
  const { row } = props;
  const theme = useTheme();
  const text = useMemo(() => getStatusByValue(row?.MaTrangThai)?.text || 'N/A', [row?.MaTrangThai]);
  const status = useMemo(() => `${getStatusByValue(row?.MaTrangThai)?.value}`, [row?.MaTrangThai]);
  const sx: Sx = useMemo(() => {
    if (!status) return undefined as unknown as Sx;
    const _props: Sx =
      {
        [STATUS.DONE_PROCESS.value]: {
          background: theme.palette.success.main,
          color: theme.palette.success.contrastText,
        },
        [STATUS.IN_PROCESS.value]: {
          background: theme.palette.secondary.light,
          color: theme.palette.secondary.contrastText,
        },
        [STATUS.PENDING_ASSIGNEE.value]: {
          color: theme.palette.primary.dark,
        },
        [STATUS.REQUEST_WITH_DRAW.value]: {
          color: theme.palette.error.dark,
        },
        [STATUS.WITH_DRAW.value]: {
          background: theme.palette.error.light,
          color: theme.palette.error.contrastText,
        },
        [STATUS.CANCELLED.value]: {
          background: theme.palette.error.main,
          color: theme.palette.error.contrastText,
        },
      }[`${status}`] || (undefined as unknown as Sx);
    return _props;
  }, [status, theme]);
  return <ChipStyled label={text} size="small" sx={{ textTransform: 'uppercase', ...(sx as any) }} />;
});
export default CellStatus;
