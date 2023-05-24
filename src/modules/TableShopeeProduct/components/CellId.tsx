import NavLinkNoStyle from '@/components/nav/NavLinkNoStyle';
import { createCellInnerComponent } from '@/components/table';
import PATHS from '@/constants/paths';
import useSnackbarNotify from '@/hooks/useSnackbarNotify';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { styled } from '@mui/material';
import type { ChipProps } from '@mui/material/Chip';
import Chip from '@mui/material/Chip';
import { useCallback } from 'react';
import type { RowData } from '../_types';
const ChipStyled = styled(Chip)<ChipProps>(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  borderRadius: theme.spacing(0.5),
  transform: 'all ease .3s',
  ':hover': {
    boxShadow: theme.shadows[4],
    cursor: 'pointer',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '& svg': {
      color: theme.palette.primary.contrastText,
    },
  },
}));
const CellId = createCellInnerComponent<RowData>(function Id(props) {
  const { row } = props;
  const { showSuccessNotify } = useSnackbarNotify();
  const copyBookingCode = useCallback(
    (e: any) => {
      e?.preventDefault?.();
      if (!navigator?.clipboard?.writeText || !row?.itemid) return;
      navigator.clipboard.writeText(row.bookingCode);
      showSuccessNotify(`đã sao chép mã đơn hàng ${row.bookingCode}`);
    },
    [row, showSuccessNotify]
  );
  return (
    <NavLinkNoStyle to={PATHS.demoTable + '?itemid=' + row?.itemid}>
      <ChipStyled
        icon={<OpenInNewIcon />}
        label={row?.itemid || ''}
        size="small"
        deleteIcon={<FileCopyIcon />}
        onDelete={copyBookingCode as any}
      />
    </NavLinkNoStyle>
  );
});
export default CellId;
